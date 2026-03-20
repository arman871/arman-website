// ==================== DATA STORAGE SYSTEM ====================
// LocalStorage based data persistence for Aivonex Technologies

const DB_NAME = 'arman_tech_db';
const DB_VERSION = 1;

// Initialize database
function initDB() {
    const stores = {
        contacts: [],
        payments: [],
        certificates: [],
        lors: [],
        offers: [],
        enrollments: []
    };
    
    if (!localStorage.getItem(DB_NAME)) {
        localStorage.setItem(DB_NAME, JSON.stringify(stores));
        console.log('✅ Database initialized');
    }
}

// Save data
function saveData(store, data) {
    const db = JSON.parse(localStorage.getItem(DB_NAME));
    data.id = Date.now();
    data.createdAt = new Date().toISOString();
    db[store].push(data);
    localStorage.setItem(DB_NAME, JSON.stringify(db));
    return data;
}

// Get all data from store
function getData(store) {
    const db = JSON.parse(localStorage.getItem(DB_NAME));
    return db[store] || [];
}

// Get single item by ID
function getDataById(store, id) {
    const db = JSON.parse(localStorage.getItem(DB_NAME));
    return db[store].find(item => item.id === id);
}

// Delete data
function deleteData(store, id) {
    const db = JSON.parse(localStorage.getItem(DB_NAME));
    db[store] = db[store].filter(item => item.id !== id);
    localStorage.setItem(DB_NAME, JSON.stringify(db));
    return true;
}

// Export all data
function exportData() {
    const db = JSON.parse(localStorage.getItem(DB_NAME));
    const blob = new Blob([JSON.stringify(db, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arman_data_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Import data
function importData(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        localStorage.setItem(DB_NAME, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Import failed:', e);
        return false;
    }
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to delete all data? This cannot be undone!')) {
        localStorage.removeItem(DB_NAME);
        initDB();
        alert('All data cleared!');
    }
}

// Initialize on load
initDB();
console.log('💾 Data Storage System Ready');

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

// ==================== SMOOTH SCROLL ====================
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

// ==================== CONTACT FORM - WITH DATA SAVE ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        phone: e.target.querySelector('input[type="tel"]').value,
        program: e.target.querySelector('select').value,
        message: e.target.querySelector('textarea').value
    };
    
    // Save to database
    saveData('contacts', formData);
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
    }, 3000);
    
    alert('✅ Message saved successfully!');
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input').value;
        saveData('newsletter', { email });
        
        const button = newsletterForm.querySelector('button');
        const originalIcon = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.background = '';
            newsletterForm.reset();
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

// ==================== PDF GENERATION - WITH DATA SAVE ====================
const { jsPDF } = window.jspdf;

// Generate Certificate
document.getElementById('generateCertificate')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const certData = {
        name: document.getElementById('certName').value,
        course: document.getElementById('certCourse').value,
        duration: document.getElementById('certDuration').value,
        date: document.getElementById('certDate').value,
        regId: document.getElementById('certId').value,
        grade: document.getElementById('certGrade').value
    };
    
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
    doc.text(certData.name, 148.5, 100, { align: 'center' });
    
    // Course details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text(`has successfully completed the internship program in`, 148.5, 115, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text(certData.course, 148.5, 128, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text(`for ${certData.duration} months with ${certData.grade} performance.`, 148.5, 143, { align: 'center' });
    
    // Date and ID
    doc.setFontSize(12);
    doc.text(`Registration ID: ${certData.regId}`, 148.5, 160, { align: 'center' });
    doc.text(`Date: ${certData.date}`, 148.5, 168, { align: 'center' });
    
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
    doc.save(`Certificate_${certData.name.replace(/\s+/g, '_')}.pdf`);
    
    // Save to database
    saveData('certificates', certData);
    
    alert('✅ Certificate generated and saved!');
    this.reset();
});

// Generate LOR
document.getElementById('generateLOR')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const lorData = {
        name: document.getElementById('lorName').value,
        course: document.getElementById('lorCourse').value,
        duration: document.getElementById('lorDuration').value,
        date: document.getElementById('lorDate').value,
        regId: document.getElementById('lorId').value,
        purpose: document.getElementById('lorPurpose').value
    };
    
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
    
    doc.text('Date: ' + lorData.date, 20, y);
    y += lineHeight * 2;
    
    doc.text('To Whom It May Concern,', 20, y);
    y += lineHeight * 2;
    
    doc.setFont('times', 'normal');
    const introText = 'This letter serves as a formal recommendation for';
    doc.text(introText, 20, y);
    y += lineHeight;
    
    doc.setFont('times', 'bold');
    doc.text(lorData.name, 20, y);
    y += lineHeight;
    
    doc.setFont('times', 'normal');
    doc.text(`who has successfully completed an internship program with us in ${lorData.course}`, 20, y);
    y += lineHeight;
    doc.text(`for a duration of ${lorData.duration} months.`, 20, y);
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
    doc.text(`We believe that ${lorData.name} will be a valuable asset to any organization and`, 20, y);
    y += lineHeight;
    doc.text('highly recommend them for ' + lorData.purpose + '.', 20, y);
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
    doc.text('Registration ID: ' + lorData.regId, 105, 288, { align: 'center' });
    doc.text('Email: aivonextechnologie@gmail.com | Phone: +91 73079 67581', 105, 294, { align: 'center' });
    
    // Save PDF
    doc.save(`LOR_${lorData.name.replace(/\s+/g, '_')}.pdf`);
    
    // Save to database
    saveData('lors', lorData);
    
    alert('✅ LOR generated and saved!');
    this.reset();
});

// Generate Offer Letter
document.getElementById('generateOffer')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const offerData = {
        name: document.getElementById('offerName').value,
        role: document.getElementById('offerRole').value,
        stipend: document.getElementById('offerStipend').value,
        startDate: document.getElementById('offerStartDate').value,
        duration: document.getElementById('offerDuration').value,
        offerDate: document.getElementById('offerDate').value
    };
    
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
    
    doc.text('Date: ' + offerData.offerDate, 20, y);
    y += lineHeight * 2;
    
    doc.text('Dear ' + offerData.name + ',', 20, y);
    y += lineHeight * 2;
    
    doc.text('We are pleased to offer you an internship position at Aivonex Technologies', 20, y);
    y += lineHeight;
    doc.text('as a ' + offerData.role + '. We were impressed with your skills and believe you will', 20, y);
    y += lineHeight;
    doc.text('be a valuable addition to our team.', 20, y);
    y += lineHeight * 2;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Position Details:', 20, y);
    y += lineHeight * 1.5;
    
    doc.setFont('helvetica', 'normal');
    const details = [
        `Position: ${offerData.role}`,
        `Duration: ${offerData.duration} months`,
        `Start Date: ${offerData.startDate}`,
        `Stipend: ₹${offerData.stipend}/month`,
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
    doc.save(`OfferLetter_${offerData.name.replace(/\s+/g, '_')}.pdf`);
    
    // Save to database
    saveData('offers', offerData);
    
    alert('✅ Offer Letter generated and saved!');
    this.reset();
});

// ==================== PAYMENT MODAL - WITH DATA SAVE ====================
function showPaymentModal(method) {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
    currentPaymentMethod = method;
}

let currentPaymentMethod = 'UPI';

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
    
    const paymentData = {
        method: currentPaymentMethod,
        transactionId: e.target.querySelector('input[type="text"]').value,
        amount: e.target.querySelector('input[type="number"]').value,
        date: e.target.querySelector('input[type="date"]').value
    };
    
    // Save to database
    saveData('payments', paymentData);
    
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
            alert('✅ Payment details saved! We will verify shortly.');
        }, 2000);
    }, 1500);
});

// ==================== CARD FORM SUBMIT ====================
document.getElementById('cardForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const paymentData = {
        method: 'Card',
        cardNumber: e.target.querySelector('input[placeholder="Card Number"]').value,
        amount: 99
    };
    
    const btn = e.target.querySelector('.btn-pay');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Save payment
        saveData('payments', paymentData);
        
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

// ==================== INTERSECTION OBSERVER ====================
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

// ==================== ACTIVE NAV LINK ====================
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

// ==================== PARALLAX EFFECT ====================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ==================== RIPPLE EFFECT ====================
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

// ==================== ADMIN PANEL (Data View) ====================
// Press 'A' key to open admin panel
document.addEventListener('keydown', (e) => {
    if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault();
        showAdminPanel();
    }
});

function showAdminPanel() {
    const db = JSON.parse(localStorage.getItem(DB_NAME));
    let html = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;padding:20px;overflow:auto;">
            <div style="max-width:1200px;margin:0 auto;background:#1a1a2e;color:#fff;padding:30px;border-radius:15px;">
                <h1 style="color:#00d4ff;">📊 Aivonex Technologies - Admin Dashboard</h1>
                <p>Press ESC or click X to close</p>
                <button onclick="this.closest('div[style*=fixed]').remove()" style="position:absolute;top:20px;right:20px;padding:10px 20px;background:#ff4757;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1.2rem;">✕</button>
                
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin:30px 0;">
                    <div style="background:#16213e;padding:20px;border-radius:10px;">
                        <h3 style="color:#00d4ff;">📝 Contacts</h3>
                        <p style="font-size:2rem;">${db.contacts?.length || 0}</p>
                    </div>
                    <div style="background:#16213e;padding:20px;border-radius:10px;">
                        <h3 style="color:#00d4ff;">💰 Payments</h3>
                        <p style="font-size:2rem;">${db.payments?.length || 0}</p>
                    </div>
                    <div style="background:#16213e;padding:20px;border-radius:10px;">
                        <h3 style="color:#00d4ff;">📜 Certificates</h3>
                        <p style="font-size:2rem;">${db.certificates?.length || 0}</p>
                    </div>
                    <div style="background:#16213e;padding:20px;border-radius:10px;">
                        <h3 style="color:#00d4ff;">📄 LORs</h3>
                        <p style="font-size:2rem;">${db.lors?.length || 0}</p>
                    </div>
                    <div style="background:#16213e;padding:20px;border-radius:10px;">
                        <h3 style="color:#00d4ff;">💼 Offers</h3>
                        <p style="font-size:2rem;">${db.offers?.length || 0}</p>
                    </div>
                </div>
                
                <div style="margin:20px 0;">
                    <button onclick="exportData()" style="padding:10px 20px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;margin-right:10px;">📥 Export Data</button>
                    <button onclick="clearAllData()" style="padding:10px 20px;background:#ff4757;color:#fff;border:none;border-radius:8px;cursor:pointer;">🗑️ Clear All Data</button>
                </div>
                
                <div style="margin-top:30px;">
                    <h2>All Data (JSON)</h2>
                    <pre style="background:#0f0f23;padding:20px;border-radius:10px;overflow:auto;max-height:400px;">${JSON.stringify(db, null, 2)}</pre>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

// ==================== CONSOLE EASTER EGG ====================
console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Aivonex Technologies                               ║
║   Empowering Students & Businesses                    ║
║                                                       ║
║   📞 Student Helpline: +91 73079 67581               ║
║   📧 aivonextechnologie@gmail.com                                  ║
║                                                       ║
║   Built with ❤️ for India                           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

💾 Data Storage: Active
📊 Admin Panel: Press Ctrl+A
`);

console.log('✅ Aivonex Technologies Website Loaded Successfully!');
