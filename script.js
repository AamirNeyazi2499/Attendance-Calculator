function calculateAttendance() {
    const total = parseInt(document.getElementById('totalClasses').value);
    const attended = parseInt(document.getElementById('attendedClasses').value);
    const required = parseFloat(document.getElementById('requiredPercentage').value);

    if (isNaN(total) || isNaN(attended) || isNaN(required)) {
        alert('Please fill in all fields with valid numbers');
        return;
    }

    if (total <= 0) {
        alert('Total classes must be greater than 0');
        return;
    }

    if (attended > total) {
        alert('Attended classes cannot be greater than total classes');
        return;
    }

    if (attended < 0 || total < 0 || required < 0 || required > 100) {
        alert('Please enter valid positive numbers');
        return;
    }

    const percentage = (attended / total) * 100;
    const missed = total - attended;

    // Update percentage display
    const percentageEl = document.getElementById('percentage');
    percentageEl.textContent = percentage.toFixed(2) + '%';
    
    // Set color based on percentage
    percentageEl.className = 'percentage';
    if (percentage >= required) {
        percentageEl.classList.add('high');
    } else if (percentage >= required - 10) {
        percentageEl.classList.add('medium');
    } else {
        percentageEl.classList.add('low');
    }

    // Update status
    const statusEl = document.getElementById('status');
    if (percentage >= required) {
        statusEl.textContent = '✅ You meet the required attendance!';
        statusEl.style.color = '#27ae60';
    } else {
        statusEl.textContent = '⚠️ Below required attendance';
        statusEl.style.color = '#e74c3c';
    }

    // Update details
    document.getElementById('detailTotal').textContent = total;
    document.getElementById('detailAttended').textContent = attended;
    document.getElementById('detailMissed').textContent = missed;

    // Calculate suggestion
    const suggestionEl = document.getElementById('suggestion');
    if (percentage < required) {
        const classesNeeded = Math.ceil((required * total - 100 * attended) / (100 - required));
        suggestionEl.innerHTML = `<strong>📌 Suggestion:</strong> You need to attend <strong>${classesNeeded}</strong> more consecutive classes to reach ${required}% attendance.`;
    } else {
        const canMiss = Math.floor((attended - (required * total / 100)) / (required / 100));
        if (canMiss > 0) {
            suggestionEl.innerHTML = `<strong>📌 Good news!</strong> You can miss up to <strong>${canMiss}</strong> more classes and still maintain ${required}% attendance.`;
        } else {
            suggestionEl.innerHTML = `<strong>📌 Stay consistent!</strong> Keep attending classes to maintain your ${required}% attendance requirement.`;
        }
    }

    // Show result
    document.getElementById('result').classList.add('show');
}

function resetCalculator() {
    document.getElementById('totalClasses').value = '';
    document.getElementById('attendedClasses').value = '';
    document.getElementById('requiredPercentage').value = '75';
    document.getElementById('result').classList.remove('show');
}

// Allow Enter key to calculate
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateAttendance();
    }
});