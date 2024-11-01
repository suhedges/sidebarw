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
    var trimmedLocation = location.trim(); 
    detailsContainer.innerHTML = getLocationDetails(trimmedLocation);
    detailsContainer.style.display = 'flex';
    document.getElementById('back-arrow').style.display = 'block';
}

function getLocationDetails(location) {
    var details = {
        'EVANSVILLE, IN': `
            <p class="clickable address" onclick="openInMaps('2108 N FARES AVE, EVANSVILLE, IN 47711')">2108 N FARES AVE<br>EVANSVILLE, IN 47711</p>
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
        'HENDERSON, KY': `
            <p class="clickable address" onclick="openInMaps('414 N INGRAM, HENDERSON, KY 42420')">414 N INGRAM<br>HENDERSON, KY 42420</p>
            <p class="clickable phone" onclick="makeCall('270-826-0617')">270-826-0617</p>
            <p>Fax: 270-826-0989</p>
            <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
            <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `,
         'VINCENNES, IN': `
            <p class="clickable address" onclick="openInMaps('1609 WILLOW ST, VINCENNES, IN 48591')">1609 WILLOW ST<br>VINCENNES, IN 48591</p>
            <p class="clickable phone" onclick="makeCall('812-882-2711')">812-882-2711</p>
            <p>Fax: 812-882-0322</p>
            <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
            <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `,
         'BLOOMINGTON, IN': `
             <p class="clickable address" onclick="openInMaps('5117 S COMMERCIAL ST, BLOOMINGTON, IN 47403')">5117 S COMMERCIAL ST<br>BLOOMINGTON, IN 47403</p>
             <p class="clickable phone" onclick="makeCall('812-333-4331')">812-333-4331</p>
             <p>Fax: 812-333-5512</p>
             <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
             <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `,
         'HOPKINSVILLE, KY': `
             <p class="clickable address" onclick="openInMaps('1800 VFW LANE, HOPKINSVILLE, KY 42240')">1800 VFW LANE<br>HOPKINSVILLE, KY 42240</p>
             <p class="clickable phone" onclick="makeCall('270-889-0530')">270-889-0530</p>
             <p>Fax: 270-889-0750</p>
             <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
             <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `,
         'INDIANAPOLIS, IN': `
             <p class="clickable address" onclick="openInMaps('2205 ENTERPRISE PARK PLACE, INDIANAPOLIS, IN 46218')">2205 ENTERPRISE PARK PLACE<br>INDIANAPOLIS, IN 46218</p>
             <p class="clickable phone" onclick="makeCall('317-924-3287')">317-924-3287</p>
             <p>Fax: 317-924-3561</p>
             <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
             <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `,
         'MADISONVILLE, KY': `
             <p class="clickable address" onclick="openInMaps('1115 ISLAND FORD RD, MADISONVILLE, KY 42431')">1115 ISLAND FORD RD<br>MADISONVILLE, KY 42431</p>
             <p class="clickable phone" onclick="makeCall('270-825-0788')">270-825-0788</p>
             <p>Fax: 270-825-0786</p>
             <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
             <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `,
         'OWENSBORO, KY': `
             <p class="clickable address" onclick="openInMaps('1216 WING AVE, OWENSBORO, KY 42303')">1216 WING AVE<br>OWENSBORO, KY 42303</p>
             <p class="clickable phone" onclick="makeCall('270-228-4343')">270-228-4343</p>
             <p>Fax: 270-684-6673</p>
             <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
             <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `,
         'DuBOIS, IL': `
             <p class="clickable address" onclick="openInMaps('716 HWY 51, DuBOIS, IL 62831')">716 HWY 51<br>DuBOIS, IL 62831</p>
             <p class="clickable phone" onclick="makeCall('618-787-2117')">618-787-2117</p>
             <p>Fax: 618-787-2015</p>
             <p class="clickable email" onclick="sendEmail('customerservice@tristate-bearing.com')">Email: customerservice@tristate-bearing.com</p>
             <p>Office Hours: Monday-Friday 7:30 AM - 5 PM</p>
         `
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
