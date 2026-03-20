// ==================== MOBILE MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SCROLL TO TOP ====================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        const originalIcon = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.background = '';
            input.value = '';
        }, 2000);
    });
}

// ==================== DOCUMENT TABS ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const documentForms = document.querySelectorAll('.document-form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        documentForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${tabName}-form`) {
                form.classList.add('active');
            }
        });
    });
});

// ==================== PDF GENERATION ====================
const { jsPDF } = window.jspdf;

// Generate Certificate
document.getElementById('generateCertificate')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('certName').value;
    const course = document.getElementById('certCourse').value;
    const duration = document.getElementById('certDuration').value;
    const date = document.getElementById('certDate').value;
    const regId = document.getElementById('certId').value;
    const grade = document.getElementById('certGrade').value;
    
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });
    
    // Background gradient
    const gradient = doc.createLinearGradient(0, 0, 297, 210);
    gradient.addColorStop(0, '#f5f7fa');
    gradient.addColorStop(1, '#c3cfe2');
    doc.setFillColor(gradient);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Border
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);
    
    // Decorative corners
    doc.setFillColor(37, 99, 235);
    doc.circle(15, 15, 5, 'F');
    doc.circle(282, 15, 5, 'F');
    doc.circle(15, 195, 5, 'F');
    doc.circle(282, 195, 5, 'F');
    
    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.setTextColor(37, 99, 235);
    doc.text('CERTIFICATE', 148.5, 50, { align: 'center' });
    doc.setFontSize(20);
    doc.setTextColor(100, 100, 100);
    doc.text('OF COMPLETION', 148.5, 65, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('This is to certify that', 148.5, 85, { align: 'center' });
    
    // Student Name
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(32);
    doc.setTextColor(0, 0, 0);
    doc.text(name, 148.5, 100, { align: 'center' });
    
    // Course details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text(`has successfully completed the internship program in`, 148.5, 115, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text(course, 148.5, 128, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text(`for ${duration} months with ${grade} performance.`, 148.5, 143, { align: 'center' });
    
    // Date and ID
    doc.setFontSize(12);
    doc.text(`Registration ID: ${regId}`, 148.5, 160, { align: 'center' });
    doc.text(`Date: ${date}`, 148.5, 168, { align: 'center' });
    
    // Signatures
    doc.line(40, 185, 100, 185);
    doc.setFontSize(10);
    doc.text('Director', 70, 192, { align: 'center' });
    
    doc.line(197, 185, 257, 185);
    doc.text('HR Manager', 227, 192, { align: 'center' });
    
    // Company name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text('AIVONEX TECHNOLOGIES', 148.5, 200, { align: 'center' });
    
    // Save PDF
    doc.save(`Certificate_${name.replace(/\s+/g, '_')}.pdf`);
    
    // Show success message
    alert('Certificate generated successfully! 🎉');
    this.reset();
});

// Generate LOR
document.getElementById('generateLOR')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('lorName').value;
    const course = document.getElementById('lorCourse').value;
    const duration = document.getElementById('lorDuration').value;
    const date = document.getElementById('lorDate').value;
    const regId = document.getElementById('lorId').value;
    const purpose = document.getElementById('lorPurpose').value;
    
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('AIVONEX TECHNOLOGIES', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Letter of Recommendation', 105, 24, { align: 'center' });
    
    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    
    let y = 50;
    const lineHeight = 8;
    
    doc.text('Date: ' + date, 20, y);
    y += lineHeight * 2;
    
    doc.text('To Whom It May Concern,', 20, y);
    y += lineHeight * 2;
    
    doc.setFont('times', 'normal');
    const introText = 'This letter serves as a formal recommendation for';
    doc.text(introText, 20, y);
    y += lineHeight;
    
    doc.setFont('times', 'bold');
    doc.text(name, 20, y);
    y += lineHeight;
    
    doc.setFont('times', 'normal');
    doc.text(`who has successfully completed an internship program with us in ${course}`, 20, y);
    y += lineHeight;
    doc.text(`for a duration of ${duration} months.`, 20, y);
    y += lineHeight * 2;
    
    doc.text('During their tenure with us, they demonstrated exceptional skills in:', 20, y);
    y += lineHeight * 2;
    
    const skills = ['• Technical proficiency and problem-solving abilities',
                    '• Teamwork and collaboration',
                    '• Communication skills',
                    '• Dedication and professionalism'];
    
    skills.forEach(skill => {
        doc.text(skill, 30, y);
        y += lineHeight;
    });
    
    y += lineHeight;
    doc.text(`We believe that ${name} will be a valuable asset to any organization and`, 20, y);
    y += lineHeight;
    doc.text('highly recommend them for ' + purpose + '.', 20, y);
    y += lineHeight * 2;
    
    doc.text('Should you require any further information, please feel free to contact us.', 20, y);
    y += lineHeight * 2;
    
    doc.text('Sincerely,', 20, y);
    y += lineHeight * 2;
    
    doc.line(20, y, 100, y);
    doc.setFontSize(10);
    doc.text('Director', 60, y + 5);
    doc.setFontSize(12);
    doc.text('Aivonex Technologies', 60, y + 10);
    
    // Footer
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 280, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('Registration ID: ' + regId, 105, 288, { align: 'center' });
    doc.text('Email: aivonextechnologie@gmail.com | Phone: +91 73079 67581', 105, 294, { align: 'center' });
    
    // Save PDF
    doc.save(`LOR_${name.replace(/\s+/g, '_')}.pdf`);
    
    alert('LOR generated successfully! 🎉');
    this.reset();
});

// Generate Offer Letter
document.getElementById('generateOffer')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('offerName').value;
    const role = document.getElementById('offerRole').value;
    const stipend = document.getElementById('offerStipend').value;
    const startDate = document.getElementById('offerStartDate').value;
    const duration = document.getElementById('offerDuration').value;
    const offerDate = document.getElementById('offerDate').value;
    
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Header with gradient
    const gradient = doc.createLinearGradient(0, 0, 210, 40);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#0ea5e9');
    doc.setFillColor(gradient);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('AIVONEX TECHNOLOGIES', 105, 18, { align: 'center' });
    doc.setFontSize(12);
    doc.text('OFFER LETTER', 105, 28, { align: 'center' });
    doc.setFontSize(9);
    doc.text('Internship Program', 105, 35, { align: 'center' });
    
    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    
    let y = 60;
    const lineHeight = 8;
    
    doc.text('Date: ' + offerDate, 20, y);
    y += lineHeight * 2;
    
    doc.text('Dear ' + name + ',', 20, y);
    y += lineHeight * 2;
    
    doc.text('We are pleased to offer you an internship position at Aivonex Technologies', 20, y);
    y += lineHeight;
    doc.text('as a ' + role + '. We were impressed with your skills and believe you will', 20, y);
    y += lineHeight;
    doc.text('be a valuable addition to our team.', 20, y);
    y += lineHeight * 2;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Position Details:', 20, y);
    y += lineHeight * 1.5;
    
    doc.setFont('helvetica', 'normal');
    const details = [
        `Position: ${role}`,
        `Duration: ${duration} months`,
        `Start Date: ${startDate}`,
        `Stipend: ₹${stipend}/month`,
        `Location: Bangalore (Hybrid)`,
        `Reporting Manager: Project Lead`
    ];
    
    details.forEach(detail => {
        doc.text('• ' + detail, 30, y);
        y += lineHeight;
    });
    
    y += lineHeight;
    doc.setFont('times', 'normal');
    doc.text('During your internship, you will:', 20, y);
    y += lineHeight * 1.5;
    
    const responsibilities = [
        '• Work on live projects with real-world impact',
        '• Receive mentorship from industry experts',
        '• Gain hands-on experience with modern technologies',
        '• Participate in code reviews and team meetings',
        '• Receive a certificate upon successful completion'
    ];
    
    responsibilities.forEach(resp => {
        doc.text(resp, 30, y);
        y += lineHeight;
    });
    
    y += lineHeight * 1.5;
    doc.text('We look forward to having you on board!', 20, y);
    y += lineHeight * 2;
    
    doc.text('Best Regards,', 20, y);
    y += lineHeight * 2;
    
    doc.line(20, y, 100, y);
    doc.setFontSize(10);
    doc.text('HR Director', 60, y + 5);
    doc.setFontSize(12);
    doc.text('Aivonex Technologies', 60, y + 10);
    
    // Terms section
    y += lineHeight * 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Terms & Conditions:', 20, y);
    y += lineHeight * 1.2;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const terms = [
        '1. This offer is contingent upon successful completion of background verification.',
        '2. You must adhere to company policies and maintain confidentiality.',
        '3. The stipend will be paid monthly based on attendance.',
        '4. Either party may terminate with 2 weeks notice.',
        '5. This offer is valid for 7 days from the date of issue.'
    ];
    
    terms.forEach(term => {
        doc.text(term, 25, y);
        y += lineHeight * 0.9;
    });
    
    // Footer
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 280, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('Aivonex Technologies | aivonextechnologie@gmail.com | +91 73079 67581', 105, 288, { align: 'center' });
    doc.text('This is a computer-generated document. No signature required.', 105, 294, { align: 'center' });
    
    // Save PDF
    doc.save(`OfferLetter_${name.replace(/\s+/g, '_')}.pdf`);
    
    alert('Offer Letter generated successfully! 🎉');
    this.reset();
});

// ==================== PAYMENT MODAL ====================
function showPaymentModal(method) {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
}

// Close modal
document.querySelector('.modal-close')?.addEventListener('click', () => {
    document.getElementById('paymentModal').classList.remove('active');
});

// Close modal on outside click
document.getElementById('paymentModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.target.classList.remove('active');
    }
});

// Payment confirmation form
document.getElementById('paymentConfirmForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            document.getElementById('paymentModal').classList.remove('active');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            e.target.reset();
        }, 2000);
    }, 1500);
});

// ==================== CARD FORM SUBMIT ====================
document.getElementById('cardForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = e.target.querySelector('.btn-pay');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Payment Successful!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
            e.target.reset();
        }, 3000);
    }, 2000);
});

// ==================== INTERSECTION OBSERVER FOR FADE-IN ====================
const fadeElements = document.querySelectorAll('.service-card, .internship-card, .course-card, .mv-card, .payment-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== PARALLAX EFFECT FOR HERO ====================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ==================== RIPPLE EFFECT FOR BUTTONS ====================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-enroll, .btn-submit, .btn-course, .btn-pay, .btn-generate');

buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== CONSOLE EASTER EGG ====================
console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Aivonex Technologies                             ║
║   Empowering Students & Businesses                    ║
║                                                       ║
║   📞 Student Helpline: +91 73079 67581               ║
║   📧 aivonextechnologie@gmail.com                    ║
║                                                       ║
║   Built with ❤️ for India                           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`);

console.log('✅ Aivonex Website Loaded Successfully!');
