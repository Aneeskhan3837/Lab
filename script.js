// Mobile Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}
navSlide();

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


// Three.js 3D Animation - Realistic DNA Helix
const init3D = () => {
    const container = document.getElementById('canvas-container');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 12; // Moved back to see more

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // DNA Group
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Create DNA Structure
    const tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 8);
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);

    const blueMaterial = new THREE.MeshPhongMaterial({ color: 0x0056b3, shininess: 100 });
    const cyanMaterial = new THREE.MeshPhongMaterial({ color: 0x00a8cc, shininess: 100 });
    const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xdddddd });

    const count = 40; // Number of base pairs
    const height = 20;
    const radius = 4;
    const turns = 2;

    for (let i = 0; i < count; i++) {
        const t = (i / count);
        const angle = t * Math.PI * 2 * turns;
        const y = (t - 0.5) * height;

        // Helix 1 Sphere
        const sphere1 = new THREE.Mesh(sphereGeometry, blueMaterial);
        sphere1.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        dnaGroup.add(sphere1);

        // Helix 2 Sphere
        const sphere2 = new THREE.Mesh(sphereGeometry, cyanMaterial);
        sphere2.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
        dnaGroup.add(sphere2);

        // Connecting Bond (Cylinder)
        const bond = new THREE.Mesh(tubeGeometry, bondMaterial);
        // Position is midpoint
        bond.position.set(0, y, 0);
        // Scale to connect spheres (radius * 2)
        bond.scale.y = radius * 2;
        // Rotate to match angle
        bond.rotation.z = Math.PI / 2;
        bond.rotation.y = -angle;
        dnaGroup.add(bond);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Base rotation
        dnaGroup.rotation.y += 0.005;

        // Scroll Interaction
        const scrollY = window.scrollY;
        // Rotate based on scroll
        dnaGroup.rotation.z = scrollY * 0.002;
        // Move slightly based on scroll
        dnaGroup.position.y = scrollY * 0.005;

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

if (document.getElementById('canvas-container')) {
    init3D();
}
