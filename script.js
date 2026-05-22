// Dummy data generation
function generateDummyData(timeRange = 'Last 30 Days') {
    let days = 30;
    let multiplier = 1;

    switch(timeRange) {
        case 'Last 7 Days':
            days = 7;
            multiplier = 7 / 30; // Scale down to weekly from monthly baseline
            break;
        case 'Last 30 Days':
            days = 30;
            multiplier = 1; // Baseline
            break;
        case 'Last 90 Days':
            days = 90;
            multiplier = 90 / 30; // Scale up to quarterly from monthly baseline
            break;
        case 'Year to Date':
            days = 365;
            multiplier = 365 / 30; // Scale up to yearly from monthly baseline
            break;
        default:
            days = 30;
            multiplier = 1;
    }

    // Sales trend data
    const salesTrendLabels = [];
    const salesTrendData = [];
    const profitTrendData = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        salesTrendLabels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

        // Generate realistic-looking sales data with some variance
        const baseSales = (5000 * multiplier) + Math.sin(i * 0.2) * 1000 + Math.random() * 800;
        const profit = baseSales * (0.15 + Math.random() * 0.1); // 15-25% profit margin

        salesTrendData.push(Math.round(baseSales));
        profitTrendData.push(Math.round(profit));
    }

    // Product category data (adjusted for time range)
    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty'];
    const categoryData = categories.map(() => Math.floor(Math.random() * 15000 * multiplier) + 5000);
    const categoryColors = [
        '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'
    ];

    // Top products data (adjusted for time range)
    const topProducts = [
        { name: 'Wireless Headphones', units: Math.round(245 * multiplier), revenue: Math.round(48900 * multiplier) },
        { name: 'Smart Watch Series 5', units: Math.round(189 * multiplier), revenue: Math.round(56700 * multiplier) },
        { name: 'Ergonomic Office Chair', units: Math.round(156 * multiplier), revenue: Math.round(39000 * multiplier) },
        { name: 'Bluetooth Speaker', units: Math.round(312 * multiplier), revenue: Math.round(15600 * multiplier) },
        { name: 'Gaming Mouse', units: Math.round(420 * multiplier), revenue: Math.round(21000 * multiplier) }
    ];

    // Recent activity data (keep same for simplicity, but could be time-based)
    const recentActivity = [
        { type: 'sale', amount: '$2,450', product: 'Wireless Headphones', time: '2 min ago' },
        { type: 'refund', amount: '$89', product: 'Bluetooth Speaker', time: '15 min ago' },
        { type: 'sale', amount: '$1,200', product: 'Smart Watch Series 5', time: '28 min ago' },
        { type: 'sale', amount: '$350', product: 'Ergonomic Office Chair', time: '45 min ago' },
        { type: 'sale', amount: '$1,800', product: 'Gaming Laptop', time: '1 hr ago' },
        { type: 'refund', amount: '$120', product: 'Gaming Mouse', time: '2 hrs ago' }
    ];

    // KPI data (adjusted for time range)
    const kpis = {
        totalRevenue: Math.round(1245890 * multiplier),
        totalOrders: Math.round(3420 * multiplier),
        avgOrderValue: 364, // Keep average somewhat consistent
        conversionRate: 3.2 // Keep conversion rate somewhat consistent
    };

    return {
        salesTrendLabels,
        salesTrendData,
        profitTrendData,
        categories,
        categoryData,
        categoryColors,
        topProducts,
        recentActivity,
        kpis
    };
}

// Chart instances
let salesTrendChart = null;
let categoryChart = null;

// Initialize charts and update UI
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard('Last 30 Days'); // Initialize with default data

    // Date Picker Functionality
    const datePickerBtn = document.getElementById('datePicker');
    const dateRangeSpan = document.querySelector('.date-range span');

    datePickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Create a simple dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'date-dropdown';
        dropdown.innerHTML = `
            <ul>
                <li data-value="Last 7 Days">Last 7 Days</li>
                <li data-value="Last 30 Days">Last 30 Days</li>
                <li data-value="Last 90 Days">Last 90 Days</li>
                <li data-value="Year to Date">Year to Date</li>
            </ul>
        `;

        // Position dropdown below the button
        const rect = datePickerBtn.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.left = `${rect.left + window.scrollX}px`;
        dropdown.style.position = 'absolute';
        dropdown.style.background = 'white';
        dropdown.style.borderRadius = '8px';
        dropdown.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        dropdown.style.minWidth = '150px';
        dropdown.style.zIndex = '1000';
        dropdown.style.listStyle = 'none';
        dropdown.style.padding = '8px 0';
        dropdown.style.margin = '0';

        const list = dropdown.querySelector('ul');
        list.style.margin = '0';
        list.style.padding = '0';

        const items = dropdown.querySelectorAll('li');
        items.forEach(item => {
            item.style.padding = '12px 20px';
            item.style.cursor = 'pointer';
            item.style.fontSize = '0.9rem';
            item.style.color = '#333';
            item.addEventListener('mouseover', () => {
                item.style.backgroundColor = '#f0f0f0';
            });
            item.addEventListener('mouseout', () => {
                item.style.backgroundColor = 'transparent';
            });
            item.addEventListener('click', () => {
                const selectedValue = item.getAttribute('data-value');
                dateRangeSpan.textContent = selectedValue;
                dropdown.remove();
                // Update dashboard with new data based on selection
                updateDashboard(selectedValue);
            });
        });

        // Remove any existing dropdown
        const existingDropdown = document.querySelector('.date-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        document.body.appendChild(dropdown);

        // Close dropdown when clicking outside
        const closeDropdown = (e) => {
            if (!dropdown.contains(e.target) && e.target !== datePickerBtn) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', closeDropdown);
        }, 100);
    });
});

// Function to update the entire dashboard with new data
function updateDashboard(timeRange) {
    const data = generateDummyData(timeRange);

    // Update KPIs
    document.getElementById('totalRevenue').textContent = `$${data.kpis.totalRevenue.toLocaleString()}`;
    document.getElementById('totalOrders').textContent = data.kpis.totalOrders.toLocaleString();
    document.getElementById('avgOrderValue').textContent = `$${data.kpis.avgOrderValue}`;
    document.getElementById('conversionRate').textContent = `${data.kpis.conversionRate}%`;

    // Update Sales Trend Chart
    if (salesTrendChart) {
        salesTrendChart.data.labels = data.salesTrendLabels;
        salesTrendChart.data.datasets[0].data = data.salesTrendData;
        salesTrendChart.data.datasets[1].data = data.profitTrendData;
        salesTrendChart.update('none'); // Update without animation
    } else {
        // Initialize chart if not exists
        const salesTrendCtx = document.getElementById('salesTrendChart').getContext('2d');
        salesTrendChart = new Chart(salesTrendCtx, {
            type: 'line',
            data: {
                labels: data.salesTrendLabels,
                datasets: [
                    {
                        label: 'Sales ($)',
                        data: data.salesTrendData,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Profit ($)',
                        data: data.profitTrendData,
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false, // Disable all animations
                hover: {
                    animationDuration: 0, // Disable hover animations
                },
                responsiveAnimationDuration: 0, // Disable responsive animations
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Update Category Chart (Pie)
    if (categoryChart) {
        categoryChart.data.labels = data.categories;
        categoryChart.data.datasets[0].data = data.categoryData;
        // Update background colors if needed (though they stay the same)
        categoryChart.data.datasets[0].backgroundColor = data.categoryColors;
        categoryChart.update('none'); // Update without animation
    } else {
        // Initialize chart if not exists
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: data.categories,
                datasets: [{
                    data: data.categoryData,
                    backgroundColor: data.categoryColors,
                    borderWidth: 0,
                    hoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false, // Disable all animations
                hover: {
                    animationDuration: 0, // Disable hover animations
                },
                responsiveAnimationDuration: 0, // Disable responsive animations
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const sum = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = (value / sum * 100).toFixed(1) + '%';
                                return `${label}: $${value.toLocaleString()} (${percentage})`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Update Top Products Table
    const topProductsTableBody = document.querySelector('#topProductsTable tbody');
    topProductsTableBody.innerHTML = ''; // Clear existing rows
    data.topProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.units.toLocaleString()}</td>
            <td>$${product.revenue.toLocaleString()}</td>
        `;
        topProductsTableBody.appendChild(row);
    });

    // Update Recent Activity
    const recentActivityContainer = document.getElementById('recentActivity');
    recentActivityContainer.innerHTML = ''; // Clear existing items
    data.recentActivity.forEach(activity => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'activity-item';

        const typeIcon = activity.type === 'sale' ? '↑' : '↓';
        const typeColor = activity.type === 'sale' ? '#27ae60' : '#e74c3c';

        itemDiv.innerHTML = `
            <div class="activity-info">
                <div class="activity-icon" style="background: ${typeColor}">${typeIcon}</div>
                <div class="activity-details">
                    <h4>${activity.product}</h4>
                    <p>${activity.type === 'sale' ? 'New Sale' : 'Refund Processed'} • ${activity.time}</p>
                </div>
            </div>
            <div class="activity-amount">${activity.amount}</div>
        `;

        recentActivityContainer.appendChild(itemDiv);
    });
}