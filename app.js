// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Step navigation variables
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentStep = 1;

    // Initialize custom cursor if enabled
    initCustomCursor();
    
    // Initialize form data
    const estimateData = {
        customer: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        },
        roofDetails: {
            type: 'TPO',
            color: 'White',
            crewSize: 2,
            manDayRate: 330,
            buildingType: 'Commercial'
        },
        items: [],
        total: 0
    };

    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    initAnimations();

    // Function to initialize custom cursor
    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        
        // Uncomment to enable custom cursor
        /*
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
        */
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Navigation buttons
        nextBtn.addEventListener('click', goToNextStep);
        prevBtn.addEventListener('click', goToPrevStep);
        
        // Add item button
        document.getElementById('addItemBtn').addEventListener('click', addLineItem);
        
        // Generate PDF button
        document.getElementById('generatePdfBtn').addEventListener('click', generatePDF);
    }

    // Initialize animations
    function initAnimations() {
        gsap.from('header', {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: 'power4.out'
        });
        
        gsap.from('.estimator-container', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.3,
            ease: 'power4.out'
        });
    }

    // Go to next step
    function goToNextStep() {
        if (currentStep < 4) {
            // Validate current step
            if (!validateStep(currentStep)) {
                return;
            }
            
            // Save form data
            saveStepData(currentStep);
            
            // Update current step
            currentStep++;
            updateStepUI();
            
            // If going to review step, populate review data
            if (currentStep === 4) {
                populateReviewData();
            }
        }
    }

    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI();
        }
    }

    // Update the UI to reflect the current step
    function updateStepUI() {
        // Update step indicators
        steps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active');
            
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
        
        // Update form visibility
        formSteps.forEach(formStep => {
            formStep.classList.remove('active');
        });
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update navigation buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.textContent = currentStep === 3 ? 'Review' : 'Next';
        nextBtn.style.display = currentStep === 4 ? 'none' : 'block';
    }

    // Validate current step
    function validateStep(step) {
        switch(step) {
            case 1:
                const customerName = document.getElementById('customerName').value.trim();
                if (!customerName) {
                    alert('Please enter a customer name');
                    return false;
                }
                return true;
            
            case 2:
                return true; // No required validation for step 2
                
            case 3:
                if (estimateData.items.length === 0) {
                    alert('Please add at least one line item');
                    return false;
                }
                return true;
                
            default:
                return true;
        }
    }

    // Save data from the current step
    function saveStepData(step) {
        switch(step) {
            case 1:
                estimateData.customer = {
                    name: document.getElementById('customerName').value.trim(),
                    email: document.getElementById('customerEmail').value.trim(),
                    phone: document.getElementById('customerPhone').value.trim(),
                    address: document.getElementById('customerAddress').value.trim(),
                    city: document.getElementById('customerCity').value.trim(),
                    state: document.getElementById('customerState').value.trim(),
                    zip: document.getElementById('customerZip').value.trim()
                };
                break;
                
            case 2:
                estimateData.roofDetails = {
                    type: document.getElementById('roofType').value,
                    color: document.getElementById('roofColor').value,
                    crewSize: parseInt(document.getElementById('crewSize').value) || 2,
                    manDayRate: parseFloat(document.getElementById('manDayRate').value) || 330,
                    buildingType: document.getElementById('buildingType').value
                };
                break;
                
            case 3:
                // Item data is added through the addLineItem function
                break;
        }
    }

    // Add a new line item to the estimate
    function addLineItem() {
        const scopeSelect = document.getElementById('scopeSelect');
        const scope = scopeSelect.value;
        
        if (!scope) {
            alert('Please select a scope of work');
            return;
        }
        
        const quantity = parseInt(document.getElementById('itemQuantity').value) || 1;
        const unitPrice = parseFloat(document.getElementById('itemPrice').value) || 0;
        const total = quantity * unitPrice;
        
        // Create new item
        const item = {
            id: Date.now(), // Use timestamp as unique ID
            scope: scope,
            quantity: quantity,
            unitPrice: unitPrice,
            total: total
        };
        
        // Add to data
        estimateData.items.push(item);
        
        // Update total
        estimateData.total = calculateTotal();
        
        // Update UI
        updateItemsTable();
        
        // Reset input fields
        scopeSelect.value = '';
        document.getElementById('itemQuantity').value = 1;
        document.getElementById('itemPrice').value = 750;
    }

    // Update the items table with current items
    function updateItemsTable() {
        const tableBody = document.getElementById('itemsTableBody');
        tableBody.innerHTML = '';
        
        estimateData.items.forEach(item => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.scope}</td>
                <td>${item.quantity}</td>
                <td>$${item.unitPrice.toFixed(2)}</td>
                <td>$${item.total.toFixed(2)}</td>
                <td>
                    <button class="btn-remove" data-id="${item.id}">Remove</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', removeLineItem);
        });
        
        // Update total display
        document.getElementById('estimateTotal').textContent = estimateData.total.toFixed(2);
    }

    // Remove a line item
    function removeLineItem(e) {
        const itemId = parseInt(e.target.dataset.id);
        
        // Filter out the item
        estimateData.items = estimateData.items.filter(item => item.id !== itemId);
        
        // Update total
        estimateData.total = calculateTotal();
        
        // Update UI
        updateItemsTable();
    }

    // Calculate total estimate amount
    function calculateTotal() {
        return estimateData.items.reduce((sum, item) => sum + item.total, 0);
    }
    
    // Populate the review page with saved data
    function populateReviewData() {
        // Customer info
        document.getElementById('reviewName').textContent = estimateData.customer.name;
        document.getElementById('reviewEmail').textContent = estimateData.customer.email;
        document.getElementById('reviewPhone').textContent = estimateData.customer.phone;
        document.getElementById('reviewAddress').textContent = 
            `${estimateData.customer.address}, ${estimateData.customer.city}, ${estimateData.customer.state} ${estimateData.customer.zip}`;
        
        // Roof details
        document.getElementById('reviewRoofType').textContent = estimateData.roofDetails.type;
        document.getElementById('reviewRoofColor').textContent = estimateData.roofDetails.color;
        document.getElementById('reviewCrewSize').textContent = estimateData.roofDetails.crewSize;
        document.getElementById('reviewBuildingType').textContent = estimateData.roofDetails.buildingType;
        
        // Items
        const reviewTableBody = document.getElementById('reviewItemsTableBody');
        reviewTableBody.innerHTML = '';
        
        estimateData.items.forEach(item => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.scope}</td>
                <td>${item.quantity}</td>
                <td>$${item.unitPrice.toFixed(2)}</td>
                <td>$${item.total.toFixed(2)}</td>
            `;
            
            reviewTableBody.appendChild(row);
        });
        
        // Update total
        document.getElementById('reviewTotal').textContent = `$${estimateData.total.toFixed(2)}`;
    }
    
    // Generate PDF estimate
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        
        // Create new PDF document
        const doc = new jsPDF();
        
        // Add company info
        doc.setFontSize(22);
        doc.setTextColor(255, 62, 62); // #ff3e3e
        doc.text('ReadyAimBid', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('Commercial Roofing Estimate', 105, 28, { align: 'center' });
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 195, 38, { align: 'right' });
        
        // Add estimate number
        const estimateNumber = Math.floor(10000 + Math.random() * 90000); // Random 5-digit number
        doc.text(`Estimate #: ${estimateNumber}`, 195, 43, { align: 'right' });
        
        // Add customer information
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('CUSTOMER INFORMATION', 15, 50);
        
        doc.setFontSize(10);
        doc.text(`Name: ${estimateData.customer.name}`, 15, 58);
        doc.text(`Email: ${estimateData.customer.email}`, 15, 63);
        doc.text(`Phone: ${estimateData.customer.phone}`, 15, 68);
        doc.text(`Address: ${estimateData.customer.address}`, 15, 73);
        doc.text(`${estimateData.customer.city}, ${estimateData.customer.state} ${estimateData.customer.zip}`, 15, 78);
        
        // Add roof details
        doc.setFontSize(12);
        doc.text('ROOF DETAILS', 15, 90);
        
        doc.setFontSize(10);
        doc.text(`Roof Type: ${estimateData.roofDetails.type}`, 15, 98);
        doc.text(`Roof Color: ${estimateData.roofDetails.color}`, 15, 103);
        doc.text(`Building Type: ${estimateData.roofDetails.buildingType}`, 15, 108);
        doc.text(`Crew Size: ${estimateData.roofDetails.crewSize}`, 15, 113);
        doc.text(`Man-Day Rate: $${estimateData.roofDetails.manDayRate}`, 15, 118);
        
        // Add line items
        doc.setFontSize(12);
        doc.text('LINE ITEMS', 15, 130);
        
        // Create items table
        const tableColumn = ["Scope", "Quantity", "Unit Price", "Total"];
        const tableRows = [];
        
        estimateData.items.forEach(item => {
            const itemData = [
                item.scope,
                item.quantity.toString(),
                `$${item.unitPrice.toFixed(2)}`,
                `$${item.total.toFixed(2)}`
            ];
            tableRows.push(itemData);
        });
        
        // Add items to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 135,
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 3
            },
            headStyles: {
                fillColor: [255, 62, 62],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            columnStyles: {
                0: { cellWidth: 90 },
                1: { cellWidth: 20, halign: 'center' },
                2: { cellWidth: 40, halign: 'right' },
                3: { cellWidth: 40, halign: 'right' }
            }
        });
        
        // Add total
        const finalY = doc.lastAutoTable.finalY || 150;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Total: $${estimateData.total.toFixed(2)}`, 195, finalY + 10, { align: 'right' });
        
        // Add terms and conditions
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('Terms & Conditions:', 15, finalY + 25);
        doc.setFontSize(8);
        const terms = [
            '1. Estimate valid for 30 days from the date of issue.',
            '2. 50% deposit required before work commences.',
            '3. Balance due upon completion of work.',
            '4. Warranty information provided separately.',
            '5. This estimate is subject to a site inspection.'
        ];
        
        terms.forEach((term, index) => {
            doc.text(term, 15, finalY + 30 + (index * 5));
        });
        
        // Save the PDF
        doc.save(`Roofing_Estimate_${estimateNumber}.pdf`);
    }
});
