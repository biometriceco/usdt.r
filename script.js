document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyBtn');
    const contractAddress = document.getElementById('contractAddress');
    const toast = document.getElementById('toast');
    
    // Modal elements
    const buyBtn = document.getElementById('buyBtn');
    const buyModal = document.getElementById('buyModal');
    const closeModal = document.getElementById('closeModal');
    
    copyBtn.addEventListener('click', () => {
        const address = contractAddress.innerText;
        
        // Copy to clipboard
        navigator.clipboard.writeText(address).then(() => {
            // Update button icon temporarily
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1df0a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            
            // Show toast
            toast.classList.add('show');
            
            // Reset after 3 seconds
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                toast.classList.remove('show');
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy address');
        });
    });

    // Modal behavior
    if (buyBtn && buyModal && closeModal) {
        buyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            buyModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeModal.addEventListener('click', () => {
            buyModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on outside click
        buyModal.addEventListener('click', (e) => {
            if (e.target === buyModal) {
                buyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && buyModal.classList.contains('active')) {
                buyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
