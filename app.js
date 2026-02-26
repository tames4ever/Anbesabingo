let cardsData = [];
let selectedNumbers = [];

// 4 independent slots
let slotCards = [null, null, null, null];

fetch("bingo_cards.json")
  .then(r => r.json())
  .then(data => {
    cardsData = data;
    render();
  });

function toggle(num){
  if(!num) return;
  if(selectedNumbers.includes(num)){
    selectedNumbers = selectedNumbers.filter(n => n !== num);
  } else {
    selectedNumbers.push(num);
  }
  render();
}

function render(){
  const container = document.getElementById("cards");
  container.innerHTML = "";

  for(let i = 0; i < 4; i++){
    const slot = document.createElement("div");
    slot.className = "cardSlot";

    // Picker row
    const row = document.createElement("div");
    row.className = "row";

    const btn = document.createElement("button");
    btn.textContent = "▶";

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Card #";
    input.style.flex = "1";

    btn.onclick = () => {
      const n = parseInt(input.value);
      if(n >= 1 && n <= cardsData.length){
        slotCards[i] = cardsData[n - 1];
        render();
      }
    };

    row.appendChild(btn);
    row.appendChild(input);

    // Grid
    const grid = document.createElement("div");
    grid.className = "grid";

    const card = slotCards[i]?.numbers?.flat() || Array(25).fill("");

    card.forEach((num, idx) => {
      const cell = document.createElement("div");
      cell.className = "cell";

      if(idx === 12){
        cell.textContent = "FREE";
        cell.classList.add("free");
      } else {
        cell.textContent = num || "";
      }

      if(selectedNumbers.includes(num)){
        cell.classList.add("selected");
      }

      cell.onclick = () => toggle(num);
      grid.appendChild(cell);
    });

    slot.appendChild(row);
    slot.appendChild(grid);
    container.appendChild(slot);
  }
}
