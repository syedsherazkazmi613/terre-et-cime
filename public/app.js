// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.before-after-container');
//     const beforeImage = document.querySelector('.before-image');
//     const handle = document.querySelector('.slider-handle');

//     // Initialize GSAP Draggable
//     Draggable.create(handle, {
//         type: "left",
//         bounds: container,
//         inertia: true,
//         onDrag: updateImages,
//         onPress: function() {
//             gsap.to(handle, {
//                 scale: 1.1,
//                 duration: 0.2
//             });
//         },
//         onRelease: function() {
//             gsap.to(handle, {
//                 scale: 1,
//                 duration: 0.2
//             });
//         }
//     });

//     function updateImages() {
//         const containerRect = container.getBoundingClientRect();
//         const handleRect = handle.getBoundingClientRect();
//         const percentageX = ((handleRect.left + handleRect.width/2) - containerRect.left) / containerRect.width * 100;
        
//         gsap.set(beforeImage, {
//             clipPath: `polygon(0% 0%, ${percentageX}% 0%, ${percentageX}% 100%, 0% 100%)`
//         });
//     }

//     // Set initial position
//     gsap.set(handle, {
//         left: "50%"
//     });
//     gsap.set(beforeImage, {
//         clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
//     });

//     // Add hover effect
//     // handle.addEventListener('mouseenter', () => {
//     //     gsap.to(handle, {
//     //         scale: 1.1,
//     //         duration: 0.3
//     //     });
//     // });

//     handle.addEventListener('mouseleave', () => {
//         if (!Draggable.get(handle).isDragging) {
//             gsap.to(handle, {
//                 scale: 1,
//                 duration: 0.3
//             });
//         }
//     });
// });

// Navbar animation with GSAP
gsap.to('nav', {
    scrollTrigger: {
        start: 'top top',
        end: '80px',
        onEnter: () => {
            gsap.to('nav', {
                top: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        },

        onLeaveBack: () => {
            gsap.to('nav', {
                top: window.innerWidth >= 768 ? '4.5rem' : '3rem',
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }
});

// Mobile menu toggle with GSAP
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        gsap.from(mobileMenu, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.out'
        });
    } else {
        gsap.to(mobileMenu, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                mobileMenu.classList.add('hidden');
                gsap.set(mobileMenu, {opacity: 1, y: 0});
            }
        });
    }
}

// Add this function to handle form submission
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const data = await response.json();

        if (response.ok) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } else {
            // Show error message
            showNotification(data.errors[0].msg || 'Something went wrong', 'error');
        }
    } catch (err) {
        showNotification('Failed to send message', 'error');
    }
}

// Add this function to show notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}