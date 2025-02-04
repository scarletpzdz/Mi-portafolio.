document.addEventListener('DOMContentLoaded', () => {
  const banners = document.querySelectorAll('.banner');
  
  // Usamos IntersectionObserver para detectar banners activos
  const observerOptions = {
    threshold: 0.5  // Se activa cuando al menos el 50% del banner es visible
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);
  
  banners.forEach(banner => observer.observe(banner));

  // Animación para el canvas del Banner 1
  const canvas = document.getElementById('contactCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Ajusta el tamaño del canvas al tamaño de la ventana
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Creamos partículas simples para simular un efecto "mágico"
    let particles = [];

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
    }

    Particle.prototype.update = function() {
      this.x += this.speedX;
      this.y += this.speedY;
      // Rebotar en los bordes del canvas
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    Particle.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59,130,246,0.7)'; // Color azul con transparencia
      ctx.fill();
    }

    // Inicializamos varias partículas
    for(let i = 0; i < 100; i++){
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      particles.push(new Particle(x, y));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
});

    // Efecto de burbujas en el banner 3 (Proyectos)
  const banner3 = document.getElementById('banner3');
  if (banner3) {
    banner3.addEventListener('mousemove', (e) => {
      let bubble = document.createElement('span');
      bubble.className = 'bubble';

      const rect = banner3.getBoundingClientRect();
      bubble.style.left = (e.clientX - rect.left) + 'px';
      bubble.style.top = (e.clientY - rect.top) + 'px';

      const size = Math.random() * 20 + 10; // Tamaño entre 10px y 30px
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';

      banner3.appendChild(bubble);
      setTimeout(() => bubble.remove(), 2000);
    });
  }
  
  // Simulación de múltiples ondas en el canvas del Banner 3
const currentCanvas = document.getElementById('currentCanvas');
if (currentCanvas) {
  const ctx = currentCanvas.getContext('2d');
  let width, height;

  // Ajusta el tamaño del canvas al contenedor del banner
  function resizeCurrentCanvas() {
    width = currentCanvas.width = banner3.offsetWidth;
    height = currentCanvas.height = banner3.offsetHeight;
  }
  resizeCurrentCanvas();
  window.addEventListener('resize', resizeCurrentCanvas);

  // Constructor para cada onda
  function Wave(amplitude, frequency, speed, offset, color) {
    this.amplitude = amplitude;           // Altura de la onda
    this.frequency = frequency;           // Frecuencia
    this.speed = speed;                   // Velocidad de desplazamiento
    this.offset = offset;                 // Desplazamiento vertical (offset)
    this.phase = Math.random() * 2 * Math.PI;  // Fase inicial aleatoria
    this.color = color;
  }

  // Método para actualizar la fase de la onda
  Wave.prototype.update = function() {
    this.phase += this.speed;
  };

  // Método para dibujar la onda en el canvas
  Wave.prototype.draw = function(ctx, width, height) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Punto de inicio de la onda (puedes ajustar la base vertical, por ejemplo, en la mitad del canvas más el offset)
    ctx.moveTo(0, height / 2 + this.offset);
    for (let x = 0; x < width; x++) {
      const y = height / 2 + this.offset + this.amplitude * Math.sin((x * this.frequency) + this.phase);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  // Creamos varias ondas con parámetros variados
  const waves = [
    new Wave(20, 0.02, 0.02, -30, 'rgba(59,130,246,0.8)'),
    new Wave(30, 0.015, 0.015, 0, 'rgba(59,130,246,0.5)'),
    new Wave(25, 0.03, 0.03, 30, 'rgba(59,130,246,0.6)'),
    // Puedes agregar más ondas con parámetros distintos para enriquecer el efecto
    new Wave(15, 0.025, 0.018, 50, 'rgba(59,130,246,0.4)'),
    new Wave(35, 0.01, 0.01, -50, 'rgba(59,130,246,0.7)')
  ];

  // Función de animación
  function animateWaves() {
    ctx.clearRect(0, 0, width, height);
    
    // (Opcional) Dibujar un fondo semitransparente para suavizar la transición entre frames
    ctx.fillStyle = 'rgba(68, 68, 104, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    // Actualiza y dibuja cada onda
    waves.forEach(wave => {
      wave.update();
      wave.draw(ctx, width, height);
    });
    
    requestAnimationFrame(animateWaves);
  }
  animateWaves();
}
