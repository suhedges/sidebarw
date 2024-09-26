function expandWidget() {
    var widget = document.getElementById('tsb-widget');
    widget.classList.add('expanded');
    document.getElementById('widget-content').style.display = 'flex';
    document.querySelector('.original-options').style.display = 'flex';
    document.querySelector('.sub-options').style.display = 'none';
    document.getElementById('back-arrow').style.display = 'none';
    document.getElementById('google-rating').style.display = 'block';
    document.querySelector('.location-options').style.display = 'none';
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('location-details-container').style.display = 'none';

    setTimeout(sendIframeSize, 100);
}

function shrinkWidget() {
    var widget = document.getElementById('tsb-widget');
    widget.classList.remove('expanded');
    document.getElementById('widget-content').style.display = 'none';

    setTimeout(sendIframeSize, 100);
}

function sendIframeSize() { 
    var widget = document.getElementById('tsb-widget');
    var height = widget.offsetHeight + 100;
    var width = widget.offsetWidth + 100;
    var iframe = document.querySelector('#form-container iframe');

    if (iframe && iframe.contentWindow) {
        window.parent.postMessage({ height: height, width: width }, "*");
    }

    window.parent.postMessage({ height: height, width: width }, "https://23600tsb.stage.cimm2.com/");
}

window.onload = function() {
    sendIframeSize();
};

window.onresize = function() {
    sendIframeSize();
};

function showSupportOptions() {
    document.querySelector('.original-options').style.display = 'none';
    document.getElementById('support-options').style.display = 'flex';
    document.getElementById('back-arrow').style.display = 'block';
    document.getElementById('google-rating').style.display = 'none';
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('location-details-container').style.display = 'none';
}

function showLocationOptions() {
    document.querySelector('.original-options').style.display = 'none';
    document.getElementById('location-options').style.display = 'flex';
    document.getElementById('back-arrow').style.display = 'block';
    document.getElementById('google-rating').style.display = 'none';
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('location-details-container').style.display = 'none';
}

function showChatAI() {
    document.querySelector('.original-options').style.display = 'none';
    document.getElementById('support-options').style.display = 'none';
    document.getElementById('location-options').style.display = 'none';
    document.getElementById('form-container').style.display = 'flex';
    document.querySelector('#form-container iframe').src = 'https://suhedges.github.io/sidebarw/chat_ai.html';
    document.getElementById('back-arrow').style.display = 'block';
    document.getElementById('google-rating').style.display = 'none';
    document.getElementById('location-details-container').style.display = 'none';
}

function goBack() {
    if (document.getElementById('location-details-container').style.display === 'flex') {
        showLocationOptions(); // Go back to the location list if details are shown
    } else {
        expandWidget(); // Go back to the home screen if location list is shown
    }
}

function showForm(page) {
    document.querySelector('.original-options').style.display = 'none';
    document.getElementById('support-options').style.display = 'none';
    document.getElementById('form-container').style.display = 'flex';
    document.querySelector('#form-container iframe').src = page;
    document.getElementById('back-arrow').style.display = 'block';
    document.getElementById('google-rating').style.display = 'none';
    document.getElementById('location-details-container').style.display = 'none';
}

function showQuickAnswers() {
    document.querySelector('.original-options').style.display = 'none';
    document.getElementById('support-options').style.display = 'none';
    document.getElementById('location-options').style.display = 'none';
    document.getElementById('form-container').style.display = 'flex';
    document.querySelector('#form-container iframe').src = 'https://suhedges.github.io/sidebarw/quick_ans.html';
    document.getElementById('back-arrow').style.display = 'block';
    document.getElementById('google-rating').style.display = 'none';
    document.getElementById('location-details-container').style.display = 'none';
}

function showLocationDetails(location) {
    document.getElementById('location-options').style.display = 'none';
    var detailsContainer = document.getElementById('location-details-container');
    detailsContainer.innerHTML = getLocationDetails(location);
    detailsContainer.style.display = 'flex';
    document.getElementById('back-arrow').style.display = 'block';
}

function getLocationDetails(location) {
    var details = {
        'EVANSVILLE, IN': `
            <p class="clickable address" onclick="openInMaps('2108 N FARES AVE, EVANSVILLE, IN 47711')">
                2108 N FARES AVE<br>EVANSVILLE, IN 47711</p>
            <p class="clickable phone" onclick="makeCall('812-425-1336')">812-425-1336</p>
            <p>Fax: 812-421-6788</p>
            <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
            <p>Office Hours: Monday-Friday: 7:30 AM - 6 PM; Saturday 7:30 AM - 12 PM</p>
        `,
        'JASPER, IN': `
            <p class="clickable address" onclick="openInMaps('211 W 28TH ST, JASPER, IN 47546')">211 W 28TH ST<br>JASPER, IN 47546</p>
            <p class="clickable phone" onclick="makeCall('812-482-5090')">812-482-5090</p>
            <p>Fax: 812-482-3815</p>
            <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
            <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
        `,
        // More locations...
    };

    return details[location] || '<p>Location details not found.</p>';
}

function openInMaps(address) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
}

function makeCall(phoneNumber) {
    window.open(`tel:${phoneNumber}`);
}

function sendEmail(emailAddress) {
    window.open(`mailto:${emailAddress}`);
}

document.addEventListener('click', function(event) {
    var widget = document.getElementById('tsb-widget');
    if (!widget.contains(event.target) && widget.classList.contains('expanded')) {
        shrinkWidget();
    }
});

window.addEventListener('message', function(event) {
    if (event.origin === "https://23600tsb.stage.cimm2.com/") {
        if (event.data === 'shrink-widget') {
            shrinkWidget();
        }
    }
});
