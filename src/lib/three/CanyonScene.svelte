<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { createNoise2D } from 'simplex-noise';

  let { mode = 'roblox' }: { mode?: 'roblox' | 'general' | 'blog' } = $props();

  let canvas: HTMLCanvasElement;
  let applyCurrentMode = (_mode: 'roblox' | 'general' | 'blog') => {};

  onMount(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0xdceefb, 20, 48);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 6.8, 11.5);
    camera.lookAt(0, 1.5, -8);

    const ambient = new THREE.HemisphereLight(0xf8fcff, 0xf29b4b, 2.1);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffe3bf, 1.9);
    sun.position.set(-8, 12, 6);
    scene.add(sun);

    const noise2D = createNoise2D();
    const terrainGeometry = new THREE.PlaneGeometry(34, 54, 70, 110);
    const positions = terrainGeometry.attributes.position;
    const colors: number[] = [];
    const color = new THREE.Color();
    const baseHeights = new Float32Array(positions.count);
    const baseXY = Array.from({ length: positions.count }, (_, i) => ({
      x: positions.getX(i),
      y: positions.getY(i)
    }));

    const applyMode = (nextMode: 'roblox' | 'general' | 'blog') => {
      const isGeneral = nextMode === 'general';
      const isBlog = nextMode === 'blog';
      const isDark = isGeneral || isBlog;

      fog.color.set(isDark ? 0x07131f : 0xdceefb);
      fog.near = isDark ? 14 : 20;
      fog.far = isDark ? 38 : 48;

      ambient.color.set(isDark ? 0x1a3554 : 0xf8fcff);
      ambient.groundColor.set(isBlog ? 0x082b2e : isGeneral ? 0x0a2340 : 0xf29b4b);
      ambient.intensity = isDark ? 1.45 : 2.1;

      sun.color.set(isBlog ? 0x6fe3d1 : isGeneral ? 0x7ec8ff : 0xffe3bf);
      sun.intensity = isDark ? 1.1 : 1.9;

      for (let i = 0; i < positions.count; i += 1) {
        const { x, y } = baseXY[i];
        let height = 0;

        if (isDark) {
          const swell = noise2D(x * 0.05, y * 0.045) * 0.35;
          const chop = noise2D(x * 0.12 + 18, y * 0.12 - 9) * 0.12;
          height = swell + chop - 0.2;
          color.set(isBlog ? '#177d72' : '#0f5ea8');
        } else {
          const distance = Math.abs(x) / 17;
          const canyonWalls = Math.pow(distance, 1.7) * 4.4;
          const floorDip = -Math.exp(-Math.pow(x / 3.4, 2)) * 1.5;
          const ripple = noise2D(x * 0.09, y * 0.075) * 0.58;
          const detail = noise2D(x * 0.22 + 30, y * 0.18 - 14) * 0.18;
          height = canyonWalls + floorDip + ripple + detail;
          color.set('#c74a16');
        }

        baseHeights[i] = height;
        positions.setZ(i, height);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      terrainGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      positions.needsUpdate = true;
      terrainGeometry.computeVertexNormals();
    };

    applyCurrentMode = applyMode;

    applyMode(mode);

    const terrain = new THREE.Mesh(
      terrainGeometry,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        flatShading: true,
        roughness: 0.98,
        metalness: 0
      })
    );

    terrain.rotation.x = -Math.PI / 2;
    terrain.position.set(0, -1.8, -11);
    scene.add(terrain);

    const farTerrain = terrain.clone();
    farTerrain.position.z = -34;
    farTerrain.position.y = -2.4;
    farTerrain.scale.setScalar(1.35);
    scene.add(farTerrain);

    const clock = new THREE.Clock();
    const pointer = { x: 0, y: 0 };
    const smoothedPointer = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
        const isGeneral = mode === 'general';
        const isBlog = mode === 'blog';
        const isDark = isGeneral || isBlog;

      smoothedPointer.x += (pointer.x - smoothedPointer.x) * 0.035;
      smoothedPointer.y += (pointer.y - smoothedPointer.y) * 0.035;

      for (let i = 0; i < positions.count; i += 1) {
        const { x, y } = baseXY[i];
        const wave = isDark
          ? Math.sin(elapsed * 0.34 + y * 0.26) * 0.24 + Math.cos(elapsed * 0.28 + x * 0.24) * 0.18
          : Math.sin(elapsed * 0.18 + y * 0.24) * 0.08 + Math.cos(elapsed * 0.12 + x * 0.3) * 0.05;
        positions.setZ(i, baseHeights[i] + wave);
      }

      positions.needsUpdate = true;
      terrainGeometry.computeVertexNormals();

      const driftX = Math.sin(elapsed * 0.12) * 0.48;
      const driftY = Math.sin(elapsed * 0.2) * 0.16;
        const pointerX = smoothedPointer.x * (isDark ? 0.85 : 0.65);
        const pointerY = smoothedPointer.y * (isDark ? 0.45 : 0.3);
        const targetZ = isDark ? -7 : -8;

        camera.position.x += (driftX + pointerX - camera.position.x) * 0.035;
        camera.position.y += (((isDark ? 7.1 : 6.8) + driftY - pointerY) - camera.position.y) * 0.035;
        camera.lookAt(
        smoothedPointer.x * (isDark ? 1.5 : 1.2),
        (isDark ? 1.1 : 1.5) + Math.sin(elapsed * 0.14) * 0.08 - smoothedPointer.y * 0.45,
        targetZ
      );
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      renderer.setAnimationLoop(null);
      terrainGeometry.dispose();
      renderer.dispose();
    };
  });

  $effect(() => {
    applyCurrentMode(mode);

    if (canvas) {
      canvas.dataset.mode = mode;
    }
  });
</script>

<canvas class:dark={mode !== 'roblox'} class:blog={mode === 'blog'} bind:this={canvas} aria-hidden="true"></canvas>

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    background: linear-gradient(180deg, #ffffff 0%, #eef6ff 52%, #cfe6f6 100%);
    transition: background 300ms ease;
  }

  canvas.dark {
    background: linear-gradient(180deg, #030812 0%, #0a1a31 54%, #0f3254 100%);
  }

  canvas.blog {
    background: linear-gradient(180deg, #02070e 0%, #081921 48%, #0c2a31 100%);
  }
</style>
