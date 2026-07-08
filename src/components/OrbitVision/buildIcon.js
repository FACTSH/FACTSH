import * as THREE from 'three';

// Ported verbatim from the reference: builds a small emblem for each vision topic.
export default function buildIcon(type, group) {
  const chromeM = new THREE.MeshStandardMaterial({ color: 0xece7dd, metalness: 0.9, roughness: 0.22 });
  const chromeDarkM = new THREE.MeshStandardMaterial({ color: 0xcfc8b8, metalness: 0.9, roughness: 0.28 });
  const goldM = new THREE.MeshStandardMaterial({ color: 0xe0b158, metalness: 1, roughness: 0.2 });
  const cyanM = new THREE.MeshStandardMaterial({ color: 0x2fb8d6, emissive: 0x0f4a58, emissiveIntensity: 0.6, metalness: 0.5, roughness: 0.35 });
  const maroonM = new THREE.MeshStandardMaterial({ color: 0x9c2230, metalness: 0.5, roughness: 0.4 });
  const wireGold = new THREE.MeshBasicMaterial({ color: 0xd3a75c, wireframe: true, transparent: true, opacity: 0.55 });

  if (type === 'explain') {
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), wireGold));
    group.add(new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), cyanM));
  } else if (type === 'privacy') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.3), chromeM);
    body.position.y = -0.12; group.add(body);
    const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.05, 12, 24, Math.PI), goldM);
    shackle.position.y = 0.24; group.add(shackle);
    const slot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.16, 12), maroonM);
    slot.position.y = -0.1; group.add(slot);
  } else if (type === 'society') {
    const positions = [[0, 0.3, 0], [-0.4, -0.2, 0], [0.4, -0.2, 0]];
    positions.forEach((p) => {
      const n = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), maroonM);
      n.position.set(p[0], p[1], p[2]); group.add(n);
    });
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = new THREE.Vector3(positions[i][0], positions[i][1], positions[i][2]);
        const b = new THREE.Vector3(positions[j][0], positions[j][1], positions[j][2]);
        const dir = new THREE.Vector3().subVectors(b, a);
        const len = dir.length();
        const geo = new THREE.CylinderGeometry(0.02, 0.02, len, 8);
        const m = new THREE.Mesh(geo, goldM);
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        m.position.copy(mid);
        m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
        group.add(m);
      }
    }
  } else if (type === 'interplay') {
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.045, 14, 40), goldM);
    ringA.position.x = -0.18; group.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.045, 14, 40), cyanM);
    ringB.position.x = 0.18; ringB.rotation.y = Math.PI / 2; group.add(ringB);
  } else if (type === 'ethics') {
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 10), chromeM);
    group.add(beam);
    const barGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const bar = new THREE.Mesh(barGeo, chromeDarkM); bar.rotation.z = Math.PI / 2; bar.position.y = 0.22; group.add(bar);
    [-0.25, 0.25].forEach((x) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.03, 20), goldM);
      p.position.set(x, 0.02, 0); group.add(p);
    });
    const lock = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.1), maroonM);
    lock.position.y = -0.32; group.add(lock);
  }
}
