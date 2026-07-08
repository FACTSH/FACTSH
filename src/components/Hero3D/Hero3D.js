import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './hero3d.css';

// Ported from the reference hero scene (index2.html), adapted to React lifecycle.
const Hero3D = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function fitZ(aspect, fovDeg, halfWidth, baseZ) {
      const fovRad = (fovDeg * Math.PI) / 180;
      const z = halfWidth / (Math.max(aspect, 0.001) * Math.tan(fovRad / 2));
      return Math.max(baseZ, z);
    }

    let w = stage.clientWidth || 1, h = stage.clientHeight || 1;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0.5, 1.0, 8.6);
    camera.lookAt(0, 0.05, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    stage.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x3a1c18, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffe3b0, 1.5);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xffffff, 1.0, 30);
    rimLight.position.set(-6, 3, 5);
    scene.add(rimLight);
    const glowLight = new THREE.PointLight(0xff3b52, 0.5, 25);
    glowLight.position.set(0, -2, -6);
    scene.add(glowLight);
    const sweepLight = new THREE.PointLight(0xfff2c9, 1.2, 20);
    scene.add(sweepLight);
    const earthLight = new THREE.PointLight(0x6fc8ff, 0.7, 8);
    earthLight.position.set(-1.75, 0.5, 1.5);
    scene.add(earthLight);
    const aiLight = new THREE.PointLight(0x35e2ff, 1.1, 8);
    aiLight.position.set(1.75, 0.4, 1.5);
    scene.add(aiLight);

    const chrome = new THREE.MeshStandardMaterial({ color: 0xece7dd, metalness: 0.95, roughness: 0.16 });
    const chromeDark = new THREE.MeshStandardMaterial({ color: 0xcfc8b8, metalness: 0.9, roughness: 0.26 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xe0b158, metalness: 1, roughness: 0.2 });
    const maroonDeep = new THREE.MeshStandardMaterial({ color: 0x4a0d15, metalness: 0.6, roughness: 0.35 });

    const rig = new THREE.Group();
    scene.add(rig);

    function rod(v1, v2, radius, mat) {
      const dir = new THREE.Vector3().subVectors(v2, v1);
      const len = dir.length();
      const geo = new THREE.CylinderGeometry(radius, radius, len, 14);
      const m = new THREE.Mesh(geo, mat);
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      m.position.copy(mid);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      return m;
    }

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256; shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d');
    const sgrad = sctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    sgrad.addColorStop(0, 'rgba(0,0,0,0.55)');
    sgrad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = sgrad;
    sctx.fillRect(0, 0, 256, 256);
    const shadowBlob = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 6.5),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false })
    );
    shadowBlob.rotation.x = -Math.PI / 2;
    shadowBlob.position.y = -2.78;
    rig.add(shadowBlob);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.35, 0.42, 40), maroonDeep);
    base.position.y = -2.55;
    rig.add(base);
    const baseRing = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.055, 16, 64), gold);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -2.32;
    rig.add(baseRing);

    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 3.7, 28), chrome);
    stand.position.y = -0.55;
    rig.add(stand);

    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.5, 20), chrome);
    beam.rotation.z = Math.PI / 2;
    beam.position.y = 1.15;
    rig.add(beam);

    const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.17, 28, 28), chromeDark);
    pivot.position.y = 1.15;
    rig.add(pivot);

    const arcPts = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const x = -1.75 + t * 3.5;
      const y = 1.28 - Math.sin(t * Math.PI) * 0.22;
      arcPts.push(new THREE.Vector3(x, y, 0));
    }
    for (let i = 0; i < arcPts.length - 1; i++) { rig.add(rod(arcPts[i], arcPts[i + 1], 0.05, chrome)); }

    function earthTexture() {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 512;
      const ctx = c.getContext('2d');
      const ocean = ctx.createLinearGradient(0, 0, 0, 512);
      ocean.addColorStop(0, '#0d3f66'); ocean.addColorStop(0.5, '#1a5f8f'); ocean.addColorStop(1, '#0d3f66');
      ctx.fillStyle = ocean; ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = '#4a8f52';
      function blob(cx, cy, rx, ry, rot) {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      blob(230, 230, 90, 140, 0.3); blob(210, 150, 60, 50, -0.2); blob(520, 190, 150, 110, 0.1);
      blob(650, 150, 90, 60, 0.4); blob(560, 300, 70, 90, -0.3); blob(830, 340, 55, 45, 0.2);
      ctx.fillStyle = '#3d7a45'; blob(240, 260, 50, 70, 0.4); blob(540, 230, 80, 60, -0.1);
      ctx.fillStyle = '#e9edf0'; ctx.fillRect(0, 0, 1024, 22); ctx.fillRect(0, 490, 1024, 22);
      ctx.strokeStyle = 'rgba(224,177,88,0.28)'; ctx.lineWidth = 1;
      for (let lon = 0; lon < 1024; lon += 1024 / 12) { ctx.beginPath(); ctx.moveTo(lon, 0); ctx.lineTo(lon, 512); ctx.stroke(); }
      for (let lat = 0; lat < 512; lat += 512 / 6) { ctx.beginPath(); ctx.moveTo(0, lat); ctx.lineTo(1024, lat); ctx.stroke(); }
      const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true; return tex;
    }
    function chipTexture() {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#0a1420'; ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#123244'; ctx.lineWidth = 2;
      for (let i = 40; i < 512; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
      }
      ctx.strokeStyle = '#35e2ff'; ctx.shadowColor = '#35e2ff'; ctx.shadowBlur = 14; ctx.lineWidth = 3;
      const nodes = [[256, 256], [160, 160], [352, 160], [160, 352], [352, 352], [256, 120], [256, 392], [120, 256], [392, 256]];
      nodes.forEach((n) => { ctx.beginPath(); ctx.moveTo(256, 256); ctx.lineTo(n[0], n[1]); ctx.stroke(); });
      ctx.shadowBlur = 18; ctx.fillStyle = '#c9f6ff';
      nodes.forEach((n) => { ctx.beginPath(); ctx.arc(n[0], n[1], 7, 0, Math.PI * 2); ctx.fill(); });
      ctx.beginPath(); ctx.arc(256, 256, 16, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true; return tex;
    }

    function pan(x, side) {
      const g = new THREE.Group();
      const top = new THREE.Vector3(x, 1.24, 0);
      const panY = -0.42;
      const offsets = [[-0.02, 0], [0.02, 0], [0, -0.02], [0, 0.02]];
      offsets.forEach((o) => { g.add(rod(top, new THREE.Vector3(x + o[0], panY, o[1]), 0.028, chromeDark)); });
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.1, 36), chrome);
      disc.position.set(x, panY - 0.05, 0); g.add(disc);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.045, 14, 48), gold);
      rim.rotation.x = Math.PI / 2; rim.position.set(x, panY, 0); g.add(rim);
      if (side === 'globe') {
        const globeMat = new THREE.MeshStandardMaterial({ map: earthTexture(), metalness: 0.1, roughness: 0.7 });
        const globe = new THREE.Mesh(new THREE.SphereGeometry(0.55, 48, 48), globeMat);
        globe.position.set(x, panY + 0.55, 0); g.add(globe);
        const atmo = new THREE.Mesh(
          new THREE.SphereGeometry(0.6, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0x6fc8ff, transparent: true, opacity: 0.16, side: THREE.BackSide })
        );
        atmo.position.copy(globe.position); g.add(atmo);
        g.userData.globe = globe;
      } else {
        const tex1 = chipTexture();
        const chipMat = new THREE.MeshStandardMaterial({ map: tex1, emissiveMap: tex1, emissive: 0xffffff, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.5 });
        const chip = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.95), chipMat);
        chip.position.set(x, panY + 0.16, 0); g.add(chip);
        g.userData.chip = chip;
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(chip.geometry), new THREE.LineBasicMaterial({ color: 0x35e2ff }));
        edges.position.copy(chip.position); g.add(edges);
        for (let s = -1; s <= 1; s += 2) {
          for (let k = -0.3; k <= 0.3; k += 0.3) {
            const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.05), chromeDark);
            p1.position.set(x + s * 0.55, panY + 0.16, k); g.add(p1);
            const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.14), chromeDark);
            p2.position.set(x + k, panY + 0.16, s * 0.55); g.add(p2);
          }
        }
      }
      return g;
    }
    const globePan = pan(-1.75, 'globe');
    const chipPan = pan(1.75, 'chip');
    rig.add(globePan);
    rig.add(chipPan);

    function makeTextTexture() {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 220;
      const ctx = c.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#fffdf8'); grad.addColorStop(0.55, '#ded6c4'); grad.addColorStop(1, '#a89a80');
      ctx.font = '700 104px Georgia, "Times New Roman", serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(20,4,7,0.6)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4;
      ctx.fillText('FACTSH LAB', c.width / 2, c.height / 2 + 6);
      const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true; return tex;
    }
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.85, 0.16), chromeDark);
    plaque.position.set(0, -2.05, 0); rig.add(plaque);
    const plaqueRim = new THREE.LineSegments(new THREE.EdgesGeometry(plaque.geometry), new THREE.LineBasicMaterial({ color: 0xe0b158 }));
    plaqueRim.position.copy(plaque.position); rig.add(plaqueRim);
    const textTex = makeTextTexture();
    const textFront = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 0.72), new THREE.MeshBasicMaterial({ map: textTex, transparent: true }));
    textFront.position.set(0, -2.05, 0.09); rig.add(textFront);
    const textBack = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 0.72), new THREE.MeshBasicMaterial({ map: textTex, transparent: true }));
    textBack.position.set(0, -2.05, -0.09); textBack.rotation.y = Math.PI; rig.add(textBack);

    const sparkCount = 220;
    const sparkGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);
    const warm = new THREE.Color(0xf0c878);
    const cool = new THREE.Color(0x6fe0ff);
    for (let i = 0; i < sparkCount; i++) {
      const r = 4.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const px = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3] = px;
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const col = px < 0 ? warm : cool;
      sparkColors[i * 3] = col.r; sparkColors[i * 3 + 1] = col.g; sparkColors[i * 3 + 2] = col.b;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));
    const sparkMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);

    function onResize() {
      const nw = stage.clientWidth, nh = stage.clientHeight;
      if (nw < 10 || nh < 10) return;
      const aspect = nw / nh;
      camera.aspect = aspect;
      camera.position.z = fitZ(aspect, 40, 2.9, 8.6);
      camera.lookAt(0, 0.05, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener('resize', onResize);
    let ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(onResize);
      ro.observe(stage);
    }
    onResize();

    let stopped = false;
    const clock = new THREE.Clock();
    function frame() {
      if (stopped) return;
      const t = clock.getElapsedTime();
      rig.rotation.y = t * 0.28;
      rig.rotation.x = Math.sin(t * 0.4) * 0.04;
      rig.position.y = Math.sin(t * 0.6) * 0.04;
      sparks.rotation.y = -t * 0.045;
      sweepLight.position.set(Math.cos(t * 0.7) * 5, 2 + Math.sin(t * 0.5) * 2, Math.sin(t * 0.7) * 5);
      if (globePan.userData.globe) { globePan.userData.globe.rotation.y = t * 0.6; }
      if (chipPan.userData.chip) { chipPan.userData.chip.material.emissiveIntensity = 0.75 + Math.sin(t * 2.2) * 0.25; }
      renderer.render(scene, camera);
      if (!reduceMotion) { requestAnimationFrame(frame); } else { renderer.render(scene, camera); }
    }
    frame();

    return () => {
      stopped = true;
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      renderer.dispose();
      sparkGeo.dispose();
      if (stage.contains(renderer.domElement)) stage.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero3d-stage" ref={stageRef}></div>;
};

export default Hero3D;
