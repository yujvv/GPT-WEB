/*
 * @fileoverview | 3.x fireworks.js 背景粒子扩展函数配置
 */
import anime from 'animejs';

const fireworks = canvasEl => {
  const ctx = canvasEl.getContext('2d');
  const numberOfParticules = Number(window.location.href.split('?')[1]) || 40;
  let pointerX = 0;
  let pointerY = 0;
  // const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
  const colors = ['#FFFFFF', '#F5F5F5'];

  // 更新点击位置
  function updateCoords(e) {
    pointerX = e.clientX || e.touches[0].clientX;
    pointerY = e.clientY || e.touches[0].clientY;
    const placeData = {
      pointerX,
      pointerY,
    };
    return placeData;
  }
  // 根据点击位置开始生成动画
  function setParticuleDirection(p) {
    const angle = (anime.random(0, 360) * Math.PI) / 180;
    const value = anime.random(50, 180);
    const radius = [-1, 1][anime.random(0, 1)] * value;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    };
  }
  // 创建粒子轮廓
  function createParticule(x, y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = setParticuleDirection(p);
    p.draw = () => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    };
    return p;
  }
  // 创建粒子原型
  function createCircle(x, y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = '#FFF';
    p.radius = 0.1;
    p.alpha = 0.5;
    p.lineWidth = 6;
    p.draw = () => {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };
    return p;
  }
  // 渲染粒子
  function renderParticule(anim) {
    // eslint-disable-next-line no-restricted-syntax
    for (const row of anim.animatables) {
      row.target.draw();
    }
  }
  function animateParticules(x, y) {
    const circle = createCircle(x, y);
    const particules = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y));
    }
    anime
      .timeline()
      .add({
        targets: particules,
        x(p) {
          return p.endPos.x;
        },
        y(p) {
          return p.endPos.y;
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0,
      });
  }
  // canvas设置
  function setCanvasSize() {
    canvasEl.width = window.innerWidth * 2;
    canvasEl.height = window.innerHeight * 2;
    canvasEl.style.width = `${window.innerWidth}px`;
    canvasEl.style.height = `${window.innerHeight}px`;
    canvasEl.getContext('2d').scale(2, 2);
  }
  // render index
  const render = anime({
    duration: Infinity,
    update() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    },
  });

  return {
    render,
    setCanvasSize,
    animateParticules,
    updateCoords,
  };
};

export default fireworks;
