let contador = 1;

document.getElementById("radio-01").checked = true;

setInterval(function () {
    passaImagem();
}, 5000)

function passaImagem() {
    contador++;
    if (contador > 3) {
        contador = 1;
    }

    document.getElementById("radio-0" + contador).checked = true;

}

(function initProductsCarousel(){
  const root = document.querySelector(".carrosel-container");
  if (!root) return;

  const viewport = root.querySelector(".carrosel-itens");
  const track    = root.querySelector(".carrosel-object");
  const items    = Array.from(track.querySelectorAll(".carrosel-item"));
  const prevBtn  = root.querySelector(".prev-arrow");
  const nextBtn  = root.querySelector(".next-arrow");
  const dotsBox  = root.querySelector(".dots");

  const VISIBLE = 4;                               // 4 por página (print 1)
  const pages   = Math.ceil(items.length / VISIBLE);
  let page = 0;

  // Se não tem navegação, esconde controles e sai
  if (pages <= 1){
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    dotsBox.style.display = "none";
    return;
  }

  // cria bolinhas
  dotsBox.innerHTML = "";
  for (let i = 0; i < pages; i++){
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot" + (i === 0 ? " active" : "");
    b.addEventListener("click", () => goTo(i));
    dotsBox.appendChild(b);
  }
  const dots = Array.from(dotsBox.children);

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function goTo(p){
    page = clamp(p, 0, pages - 1);

    // índice do 1º item da página
    const idx = page * VISIBLE;
    const target = items[idx];

    // desloca o trilho para alinhar o item à borda esquerda do viewport
    const x = target ? target.offsetLeft : 0;
    track.style.transform = `translate3d(${-x}px,0,0)`;

    // UI
    dots.forEach((d,i)=> d.classList.toggle("active", i === page));
    prevBtn.disabled = page === 0;
    nextBtn.disabled = page === pages - 1;
  }

  // setas
  prevBtn.addEventListener("click", () => goTo(page - 1));
  nextBtn.addEventListener("click", () => goTo(page + 1));

  // mantém alinhado após resize
  window.addEventListener("resize", () => goTo(page));

  // start
  goTo(0);
})();