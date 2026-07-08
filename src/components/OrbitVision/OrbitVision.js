import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import buildIcon from './buildIcon';
import introInfo from '../../Content/intoInfo';
import './orbitvision.css';

// Reference topics carry the icon/colour language; real lab copy comes from Content/intoInfo.js.
const REFERENCE_TOPICS = [
  { icon: 'explain', color: '#4fd8f0', threeColor: 0x4fd8f0 },
  { icon: 'privacy', color: '#7fc7e0', threeColor: 0x7fc7e0 },
  { icon: 'society', color: '#c1495a', threeColor: 0xc1495a },
  { icon: 'interplay', color: '#d3a75c', threeColor: 0xd3a75c },
  { icon: 'ethics', color: '#e0a23c', threeColor: 0xe0a23c },
];

const visionData = introInfo.map((item, i) => ({
  ...REFERENCE_TOPICS[i % REFERENCE_TOPICS.length],
  label: item.title,
  text: item.description,
}));

function fitZ(aspect, fovDeg, halfWidth, baseZ) {
  const fovRad = (fovDeg * Math.PI) / 180;
  const z = halfWidth / (Math.max(aspect, 0.001) * Math.tan(fovRad / 2));
  return Math.max(baseZ, z);
}

const OrbitVision = () => {
  const stageRef = useRef(null);
  const tooltipRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const hoverIndexRef = useRef(-1);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  useEffect(() => {
    const stageEl = stageRef.current;
    const tooltip = tooltipRef.current;
    if (!stageEl || !tooltip) return undefined;

    let w = stageEl.clientWidth || 1, h = stageEl.clientHeight || 1;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 30);
    camera.position.set(0, 1.1, 9.5);
    camera.lookAt(0, 0.05, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    stageEl.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x3a1c18, 0.65));
    const key = new THREE.DirectionalLight(0xffe3b0, 1.3); key.position.set(4, 6, 4); scene.add(key);
    const rim = new THREE.PointLight(0xffffff, 0.9, 20); rim.position.set(-5, 3, 4); scene.add(rim);

    const chromeM = new THREE.MeshStandardMaterial({ color: 0xece7dd, metalness: 0.9, roughness: 0.22 });
    const chromeDarkM = new THREE.MeshStandardMaterial({ color: 0xcfc8b8, metalness: 0.9, roughness: 0.28 });
    const goldM = new THREE.MeshStandardMaterial({ color: 0xe0b158, metalness: 1, roughness: 0.2 });
    const maroonM = new THREE.MeshStandardMaterial({ color: 0x9c2230, metalness: 0.5, roughness: 0.4 });
    const maroonDeepM = new THREE.MeshStandardMaterial({ color: 0x4a0d15, metalness: 0.6, roughness: 0.35 });

    function rod(v1, v2, radius, mat) {
      const dir = new THREE.Vector3().subVectors(v2, v1);
      const len = dir.length();
      const geo = new THREE.CylinderGeometry(radius, radius, len, 12);
      const m = new THREE.Mesh(geo, mat);
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      m.position.copy(mid);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      return m;
    }

    const core = new THREE.Group();
    const cbase = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.66, 0.2, 32), maroonDeepM);
    cbase.position.y = -1.0; core.add(cbase);
    const cring = new THREE.Mesh(new THREE.TorusGeometry(0.57, 0.028, 12, 48), goldM);
    cring.rotation.x = Math.PI / 2; cring.position.y = -0.9; core.add(cring);
    const cstand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 1.5, 20), chromeM);
    cstand.position.y = -0.25; core.add(cstand);
    const cbeam = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 1.38, 14), chromeM);
    cbeam.rotation.z = Math.PI / 2; cbeam.position.y = 0.5; core.add(cbeam);
    const cpivot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), chromeDarkM);
    cpivot.position.y = 0.5; core.add(cpivot);
    [-0.7, 0.7].forEach((x) => {
      const top = new THREE.Vector3(x, 0.56, 0), bot = new THREE.Vector3(x, -0.16, 0);
      core.add(rod(top, bot, 0.013, chromeDarkM));
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.04, 28), chromeM);
      disc.position.set(x, -0.2, 0); core.add(disc);
      const rim2 = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.018, 10, 32), goldM);
      rim2.rotation.x = Math.PI / 2; rim2.position.set(x, -0.18, 0); core.add(rim2);
    });
    const coreGlobe = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), maroonM);
    coreGlobe.position.set(-0.7, 0.02, 0); core.add(coreGlobe);
    const coreGlobeWire = new THREE.Mesh(
      new THREE.SphereGeometry(0.23, 14, 10),
      new THREE.MeshBasicMaterial({ color: 0xe0b158, wireframe: true, transparent: true, opacity: 0.6 })
    );
    coreGlobeWire.position.copy(coreGlobe.position); core.add(coreGlobeWire);
    const coreChip = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.08, 0.38),
      new THREE.MeshStandardMaterial({ color: 0x0a1420, emissive: 0x35e2ff, emissiveIntensity: 0.5, metalness: 0.4, roughness: 0.5 })
    );
    coreChip.position.set(0.7, 0.0, 0); core.add(coreChip);
    const coreChipEdge = new THREE.LineSegments(new THREE.EdgesGeometry(coreChip.geometry), new THREE.LineBasicMaterial({ color: 0x35e2ff }));
    coreChipEdge.position.copy(coreChip.position); core.add(coreChipEdge);
    scene.add(core);

    const nodeRadius = 2.6;
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = -0.5;
    scene.add(orbitGroup);
    const guideRing = new THREE.Mesh(
      new THREE.TorusGeometry(nodeRadius, 0.008, 8, 90),
      new THREE.MeshBasicMaterial({ color: 0xd3a75c, transparent: true, opacity: 0.22 })
    );
    guideRing.rotateX(Math.PI / 2);
    orbitGroup.add(guideRing);

    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    let orbitPaused = false, globalAngle = 0;

    const pivots = visionData.map((v, i) => {
      const pivotG = new THREE.Group();
      const iconGroup = new THREE.Group();
      iconGroup.scale.setScalar(0.46);
      buildIcon(v.icon, iconGroup);
      pivotG.add(iconGroup);
      const hit = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 10), new THREE.MeshBasicMaterial({ visible: false }));
      hit.userData.index = i;
      pivotG.add(hit);
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.44, 0.5, 36),
        new THREE.MeshBasicMaterial({ color: v.threeColor, transparent: true, opacity: 0.0, side: THREE.DoubleSide })
      );
      pivotG.add(halo);
      pivotG.userData = { phase: (i / visionData.length) * Math.PI * 2, iconGroup, hit, halo };
      orbitGroup.add(pivotG);
      return pivotG;
    });
    const hitMeshes = pivots.map((p) => p.userData.hit);

    function positionNodes(angle) {
      pivots.forEach((p) => {
        const a = angle + p.userData.phase;
        p.position.set(Math.cos(a) * nodeRadius, 0, Math.sin(a) * nodeRadius);
      });
    }
    positionNodes(0);

    function showTooltip(x, y, text) {
      tooltip.textContent = text;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
      tooltip.classList.add('show');
    }
    function hideTooltip() { tooltip.classList.remove('show'); }

    function selectVision(idx) {
      const next = activeIndexRef.current === idx ? -1 : idx;
      activeIndexRef.current = next;
      setActiveIndex(next);
      orbitPaused = next !== -1;
    }

    function onMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObjects(hitMeshes);
      if (hits.length) {
        renderer.domElement.style.cursor = 'pointer';
        hoverIndexRef.current = hits[0].object.userData.index;
        showTooltip(e.clientX, e.clientY, visionData[hoverIndexRef.current].label);
      } else {
        renderer.domElement.style.cursor = 'default';
        hoverIndexRef.current = -1;
        hideTooltip();
      }
    }
    function onLeave() { hoverIndexRef.current = -1; hideTooltip(); }
    function onClick() { if (hoverIndexRef.current >= 0) { selectVision(hoverIndexRef.current); } }
    function onTouch(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      const t = e.changedTouches[0];
      mouseNDC.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObjects(hitMeshes);
      if (hits.length) { selectVision(hits[0].object.userData.index); }
    }
    renderer.domElement.addEventListener('mousemove', onMove);
    renderer.domElement.addEventListener('mouseleave', onLeave);
    renderer.domElement.addEventListener('click', onClick);
    renderer.domElement.addEventListener('touchstart', onTouch, { passive: true });

    function onResizeOrbit() {
      const nw = stageEl.clientWidth, nh = stageEl.clientHeight;
      if (nw < 10 || nh < 10) return;
      const aspect = nw / nh;
      camera.aspect = aspect;
      camera.position.z = fitZ(aspect, 42, 3.1, 9.5);
      camera.lookAt(0, 0.05, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener('resize', onResizeOrbit);
    let orbitRO = null;
    if (window.ResizeObserver) {
      orbitRO = new ResizeObserver(onResizeOrbit);
      orbitRO.observe(stageEl);
    }
    onResizeOrbit();
    const t1 = setTimeout(onResizeOrbit, 200);
    const t2 = setTimeout(onResizeOrbit, 1100);

    let stopped = false;
    const oclock = new THREE.Clock();
    function oframe() {
      if (stopped) return;
      const dt = Math.min(oclock.getDelta(), 0.05);
      if (!orbitPaused) { globalAngle += dt * 0.32; }
      positionNodes(globalAngle);
      core.rotation.y += dt * 0.18;
      pivots.forEach((p, i) => {
        const isFocus = i === hoverIndexRef.current || i === activeIndexRef.current;
        p.userData.iconGroup.rotation.y += dt * (isFocus ? 1.6 : 0.5);
        const targetScale = isFocus ? 1.25 : 1.0;
        p.scale.x += (targetScale - p.scale.x) * 0.15;
        p.scale.y += (targetScale - p.scale.y) * 0.15;
        p.scale.z += (targetScale - p.scale.z) * 0.15;
        p.userData.halo.material.opacity += ((isFocus ? 0.5 : 0) - p.userData.halo.material.opacity) * 0.15;
        p.userData.halo.lookAt(camera.position);
      });
      renderer.render(scene, camera);
      requestAnimationFrame(oframe);
    }
    oframe();

    return () => {
      stopped = true;
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('resize', onResizeOrbit);
      if (orbitRO) orbitRO.disconnect();
      renderer.domElement.removeEventListener('mousemove', onMove);
      renderer.domElement.removeEventListener('mouseleave', onLeave);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('touchstart', onTouch);
      hideTooltip();
      renderer.dispose();
      if (stageEl.contains(renderer.domElement)) stageEl.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="orbit-vision">
      <div className="panel-eyebrow">Vision</div>
      <div className="panel-title">Five questions orbiting one idea</div>
      <p className="panel-sub">
        The globe and the chip on the emblem are the two ends of every question this lab asks.
        Hover a point, or tap it, or use the buttons underneath.
      </p>
      <div className="orbit-wrap">
        <div id="orbit-stage" ref={stageRef}></div>
      </div>
      <div className="orbit-hint">Click a point, or use the buttons below</div>
      <div className="legend">
        {visionData.map((v, i) => (
          <button
            type="button"
            key={i}
            className={`legend-btn ${activeIndex === i ? 'active' : ''}`}
            onMouseEnter={() => { hoverIndexRef.current = i; }}
            onMouseLeave={() => { if (hoverIndexRef.current === i) hoverIndexRef.current = -1; }}
            onClick={() => {
              const next = activeIndexRef.current === i ? -1 : i;
              activeIndexRef.current = next;
              setActiveIndex(next);
            }}
          >
            <span className="dot" style={{ background: v.color }}></span>
            {v.label}
          </button>
        ))}
      </div>
      {activeIndex !== -1 && (
        <div className="legend-panel">
          <h3>{visionData[activeIndex].label}</h3>
          <p>{visionData[activeIndex].text}</p>
        </div>
      )}
      <div className="orbit-tooltip" ref={tooltipRef}></div>
    </div>
  );
};

export default OrbitVision;
