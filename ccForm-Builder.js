var formSettings = {};
var defaultCookies = {
  'Necessary': true,
  'Functional': false,
  'Performance': false,
  'Analytics': false,
  'Advertisement': false,
  'Others': false
};
var acceptedCookies = defaultCookies;
var cookieSetString = "";
//var cookieStore = [];

const cookieStorage = {
  getItem: (item) => {
    const cookies = document.cookie
      .split(';')
      .map(cookie => cookie.split('='))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
    return cookies[item];
  },
  setItem: (item, value) => {
    document.cookie = `${item}=${value};`
  }
}
const storageType = cookieStorage;
const consentPropertyName = 'afx_cookie_consent';
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = (key, val) => storageType.setItem(key, val);


function cookieConsent(settings) {
  if (settings != undefined) {
    console.log("before new element");
    formSettings = settings;
    //create new element
    var ccSection = document.createElement("section");
    // ccSection.add("hidden");
    ccSection.setAttribute("id", "consent-popup");

    var fontLink = document.createElement("LINK");
    fontLink.setAttribute("rel", "stylesheet");
    fontLink.setAttribute("type", "text/css");
    fontLink.setAttribute("id", "the-retailer-google-main-font-css");
    //fontLink.setAttribute("href", "//fonts.googleapis.com/css?display=swap&amp;family=Raleway%3A400%2C500%2C600%2C700%2C400italic%2C700italic&amp;ver=3.2.12");
    fontLink.setAttribute("media", "all");
    document.head.appendChild(fontLink);

    //create style tag
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = `
    html, body {
        padding: 0;
        margin: 0;
        //font-family: Poppins;
        font-family: Raleway,-apple-system,BlinkMacSystemFont,Arial,Helvetica,'Helvetica Neue',Verdana,sans-serif;;
        font-size: 100%;
        // filter: blur(8px);
        background-size: cover;
        background-repeat: no-repeat;
    } 
    .cookie-container {
        position: absolute;
        border: 1px dashed;
        bottom: 15px;
        font-family: system-ui;
        text-align: justify;
        color: #fff;
        font-size: 14px;
        max-width: 375px;
        padding: 20px 30px;
        background: #212529;
        border-radius: 10px;
        margin: 0px 20px;
        	// display: flex;
            // align-content: center;
            // align-items: center;
            // padding: 1rem 2rem;
            // background: var(--background);
            // color: var(--white-text);
            // position: fixed;
            // bottom:0;
            // font-size: 1rem;
            // gap: 2rem;
            // opacity: 1;
            // visibility:
            // visible;
            // flex-wrap: wrap;
     }
     .svg {
      color: var(--theme-button-filled-background-color) !important;
      margin-left: calc(var(--su4) * -1) !important;
      margin-bottom: var(--su24) !important;
      vertical-align: bottom;
      width: 96;
      height: 96;
      overflow: hidden;
     }
     .cookie-container button{
        float: left;
        width: 100%;
        padding: 10px;
        margin-bottom: 5px;
        background: #ffd90a;
        border-radius: 5px;
		border-width: 0;
     }   
     .cookie-container button:hover{opacity:.7;cursor: pointer;} 
     
     
    /* The Modal (background) */
    .dialog {
      display: none; /* Hidden by default */
      position: absolute; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    /* Modal Content */
    .dialog-content {
      position: relative;
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 0;
      border-radius: 10px;
      width: 50%;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
      -webkit-animation-name: animatetop;
      -webkit-animation-duration: 0.4s;
      animation-name: animatetop;
      animation-duration: 0.4s;
      font-family: system-ui;
      font-size:14px

    }
        
    /* Add Animation */
    @-webkit-keyframes animatetop {
      from {top:-300px; opacity:0} 
      to {top:0; opacity:1}
    }
    
    @keyframes animatetop {
      from {top:-300px; opacity:0}
      to {top:0; opacity:1}
    }
    
    /* The Close Button */
    .close {
      color: #212529;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
      color: #212529;
      text-decoration: none;
      cursor: pointer;
    }
    
    .dialog-header {
      padding: 2px 16px;
      background-color: #fffff;
      color: #212529;
      font-size: 20px;
      font-weight: bold;
    }
    
    .dialog-body {
        padding: 2px 16px;
        text-align: justify;
    }
    
    .dialog-footer {
      margin: 40px;
    }

    /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 23px;
  float: right;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.collapsible {
    background-color: #eee;
    color: black;
    cursor: pointer;
    padding: 6px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 14px;
    border-radius: 8px;
    margin-top: 2px;
    margin-bottom: 4px;
  }
  
  .active, .collapsible:hover {
    background-color: #d7b70aa;
  }
  
  .collapsible::before {
    content: "+";
    color: #212529;
    font-weight: bold;
    margin-right: 6px;
    margin-left: 6px;
  }
  
  .active::before {
    content: "-";
  }
  
  .collapsible-content {
    padding: 0 18px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: white;
    color: #212529;
    margin-top: 10px;
    margin-bottom: -4px;
    margin-left: -4px;
    margin-right: -4px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .save-accept-btn{
    border: none;
    display: inline-block;
    padding: 8px 16px;
    vertical-align: middle;
    overflow: hidden;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    background: #ffd90a;
    float: right;
    border-radius: 4px;
    margin: -26px;
    color: #fff;
  }
  table{
    width: 100%;
    table-layout: fixed;
  }
  table, th, td {
    border: 0.5px solid;
    overflow: hidden;
  }
  thead{  
    background-color: #b1a598;
    text-align: center;
  }
      `;


    document.getElementsByTagName('head')[0].appendChild(styleTag);

    //set section and add child elements
    ccSection.classList.add("cookie-container");
    if (formSettings.iFramePreview) {
      ccSection.style.display = 'display';
      ccSection.style.position = 'unset';
      ccSection.style.overflow = 'auto';

    }
    else {
      ccSection.style.display = 'none';
    }
    ccSection.id = "cookie-container";
    document.body.appendChild(ccSection);
    if (formSettings.paletteColor === 'light') {
      ccSection.style.backgroundColor = 'white';
      ccSection.style.color = '#212529';
      ccSection.style.border = 'none';
    }
    //svg image
    var svg = document.createElement("svg");
    svg.setAttribute("aria-hidden", true);
    svg.setAttribute("height", 96);
    svg.setAttribute("width", 96);
    svg.setAttribute("viewBox", "0 0 96 96");
    svg.classList.add("svg");

    var path1 = document.createElement("path");
    path1.setAttribute("d", "M35 45.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zM63.5 63a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm-19 19a7.5 7.5 0 100-15 7.5 7.5 0 000 15z");
    path1.setAttribute("opacity", ".2")

    var path2 = document.createElement("path");
    path2.setAttribute("d", "M56.99 2.53a23.1 23.1 0 0114.66 6.15h.01l.01.02c.57.55.61 1.27.5 1.74v.07a10.95 10.95 0 01-3.07 4.77 9 9 0 01-6.9 2.5 10.34 10.34 0 01-9.72-10.44v-.08a10 10 0 011.03-3.74l.01-.03.02-.02c.28-.5.82-.92 1.52-.95.63-.02 1.27-.02 1.93.01zm12.04 7.83a20.1 20.1 0 00-12.2-4.83l-.92-.03c-.23.6-.38 1.25-.43 1.94a7.34 7.34 0 006.95 7.34 6 6 0 004.64-1.7c.94-.88 1.6-1.9 1.96-2.72zm15.3 8.76a6.84 6.84 0 00-5.09-.24 7.9 7.9 0 00-3.28 2.05 1.8 1.8 0 00-.3 1.95l.02.02v.02a15.16 15.16 0 008.74 7.47c.64.23 1.32.08 1.8-.33a6.63 6.63 0 001.63-1.97l.01-.03.01-.03c1.67-3.5-.12-7.32-3.54-8.91zm-5.5 3.28c.36-.25.82-.5 1.35-.67.92-.3 1.92-.35 2.89.1 2.14 1 2.92 3.14 2.11 4.88-.12.21-.26.41-.43.6l-.26-.1a12.29 12.29 0 01-5.66-4.81zM32 24a2 2 0 11-4 0 2 2 0 014 0zm12 21a2 2 0 11-4 0 2 2 0 014 0zm36 4a2 2 0 11-4 0 2 2 0 014 0zm-7 21a2 2 0 11-4 0 2 2 0 014 0zM59 81a2 2 0 11-4 0 2 2 0 014 0zM22 63a2 2 0 11-4 0 2 2 0 014 0zm27 7a9 9 0 11-18 0 9 9 0 0118 0zm-3 0a6 6 0 10-12 0 6 6 0 0012 0zM33 41a9 9 0 11-18 0 9 9 0 0118 0zm-15 0a6 6 0 1012 0 6 6 0 00-12 0zm50 11a9 9 0 11-18 0 9 9 0 0118 0zm-3 0a6 6 0 10-12 0 6 6 0 0012 0zM44.08 4.24c.31.48.33 1.09.05 1.58a17.46 17.46 0 00-2.36 8.8c0 9.55 7.58 17.24 16.85 17.24 2.97 0 5.75-.78 8.16-2.15a1.5 1.5 0 012.1.66 12.08 12.08 0 0011 6.74 12.4 12.4 0 007.85-2.75 1.5 1.5 0 012.38.74A45.76 45.76 0 0192 48.16c0 24.77-19.67 44.9-44 44.9S4 72.93 4 48.16C4 25.23 20.84 6.28 42.64 3.58a1.5 1.5 0 011.44.66zM40.22 7C21.32 10.71 7 27.7 7 48.16c0 23.17 18.39 41.9 41 41.9s41-18.73 41-41.9c0-3.52-.42-6.93-1.22-10.2a15.5 15.5 0 01-7.9 2.15c-5.5 0-10.36-2.83-12.97-7.1a19.46 19.46 0 01-8.28 1.85c-11 0-19.86-9.1-19.86-20.24 0-2.7.52-5.26 1.45-7.62zM92 91a2 2 0 100-4 2 2 0 000 4zM7 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM82.5 90a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9.5-7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13.5 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM80 14.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM53.5 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3z");

    // svg.appendChild(path1);
    // svg.appendChild(path2);
    // ccSection.appendChild(svg);
    var svgElement = `<svg aria-hidden="true" class="svg" height="96" width="96" viewBox="0 0 96 96" class="mln4 mb24 sm:d-none svg-spot spotCookieLg"><path d="M35 45.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zM63.5 63a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm-19 19a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" opacity=".2"></path><path d="M56.99 2.53a23.1 23.1 0 0114.66 6.15h.01l.01.02c.57.55.61 1.27.5 1.74v.07a10.95 10.95 0 01-3.07 4.77 9 9 0 01-6.9 2.5 10.34 10.34 0 01-9.72-10.44v-.08a10 10 0 011.03-3.74l.01-.03.02-.02c.28-.5.82-.92 1.52-.95.63-.02 1.27-.02 1.93.01zm12.04 7.83a20.1 20.1 0 00-12.2-4.83l-.92-.03c-.23.6-.38 1.25-.43 1.94a7.34 7.34 0 006.95 7.34 6 6 0 004.64-1.7c.94-.88 1.6-1.9 1.96-2.72zm15.3 8.76a6.84 6.84 0 00-5.09-.24 7.9 7.9 0 00-3.28 2.05 1.8 1.8 0 00-.3 1.95l.02.02v.02a15.16 15.16 0 008.74 7.47c.64.23 1.32.08 1.8-.33a6.63 6.63 0 001.63-1.97l.01-.03.01-.03c1.67-3.5-.12-7.32-3.54-8.91zm-5.5 3.28c.36-.25.82-.5 1.35-.67.92-.3 1.92-.35 2.89.1 2.14 1 2.92 3.14 2.11 4.88-.12.21-.26.41-.43.6l-.26-.1a12.29 12.29 0 01-5.66-4.81zM32 24a2 2 0 11-4 0 2 2 0 014 0zm12 21a2 2 0 11-4 0 2 2 0 014 0zm36 4a2 2 0 11-4 0 2 2 0 014 0zm-7 21a2 2 0 11-4 0 2 2 0 014 0zM59 81a2 2 0 11-4 0 2 2 0 014 0zM22 63a2 2 0 11-4 0 2 2 0 014 0zm27 7a9 9 0 11-18 0 9 9 0 0118 0zm-3 0a6 6 0 10-12 0 6 6 0 0012 0zM33 41a9 9 0 11-18 0 9 9 0 0118 0zm-15 0a6 6 0 1012 0 6 6 0 00-12 0zm50 11a9 9 0 11-18 0 9 9 0 0118 0zm-3 0a6 6 0 10-12 0 6 6 0 0012 0zM44.08 4.24c.31.48.33 1.09.05 1.58a17.46 17.46 0 00-2.36 8.8c0 9.55 7.58 17.24 16.85 17.24 2.97 0 5.75-.78 8.16-2.15a1.5 1.5 0 012.1.66 12.08 12.08 0 0011 6.74 12.4 12.4 0 007.85-2.75 1.5 1.5 0 012.38.74A45.76 45.76 0 0192 48.16c0 24.77-19.67 44.9-44 44.9S4 72.93 4 48.16C4 25.23 20.84 6.28 42.64 3.58a1.5 1.5 0 011.44.66zM40.22 7C21.32 10.71 7 27.7 7 48.16c0 23.17 18.39 41.9 41 41.9s41-18.73 41-41.9c0-3.52-.42-6.93-1.22-10.2a15.5 15.5 0 01-7.9 2.15c-5.5 0-10.36-2.83-12.97-7.1a19.46 19.46 0 01-8.28 1.85c-11 0-19.86-9.1-19.86-20.24 0-2.7.52-5.26 1.45-7.62zM92 91a2 2 0 100-4 2 2 0 000 4zM7 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM82.5 90a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9.5-7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13.5 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM80 14.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM53.5 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>`
    ccSection.innerHTML = svgElement;


    //Heading
    var header = document.createElement("h2");
    header.innerHTML = "Your Privacy";
    ccSection.appendChild(header);
    //paragraph
    var para = document.createElement("p");
    para.style.textAlign = 'justify';
    para.innerHTML = "We use cookies and similar technologies that are necessary to operate the website. Additional cookies are used to perform analysis of website usage. By continuing to use our website, consent to our use of cookies. For more information, please read our ";
    var policyLink = document.createElement("a");
    policyLink.setAttribute('href', formSettings.privacyPolicyLink);
    policyLink.setAttribute('target', "_blank");
    policyLink.style.color = formSettings.secondaryColor;
    policyLink.textContent = "Privacy Policy.";
    para.appendChild(policyLink);
    ccSection.appendChild(para);

    //add buttons => append it after para
    var buttonsDiv = document.createElement("div");

    //Agree button
    var acceptButton = document.createElement("button");
    acceptButton.id = "acceptButton";
    acceptButton.innerHTML = formSettings.acceptBtn.Text;
    acceptButton.style.color = formSettings.acceptBtn.Color;
    acceptButton.style.fontWeight = "500";
    acceptButton.style.backgroundColor = formSettings.acceptBtn.BackgroundColor;
    buttonsDiv.appendChild(acceptButton);
    if (!formSettings.acceptBtn.IsActive) {
      acceptButton.style.display = 'none'
    }

    //Decline button
    var declineButton = document.createElement("button");
    declineButton.id = "declineButton";
    declineButton.style.color = formSettings.declineBtn.Color;
    declineButton.style.fontWeight = "500";
    declineButton.style.backgroundColor = formSettings.declineBtn.BackgroundColor;
    declineButton.innerHTML = formSettings.declineBtn.Text;
    buttonsDiv.appendChild(declineButton);
    if (!formSettings.declineBtn.IsActive) {
      declineButton.style.display = 'none'
    }

    //Change Settings button
    var changePrefSettingsButton = document.createElement("button");
    changePrefSettingsButton.innerHTML = formSettings.changePrefBtn.Text;
    changePrefSettingsButton.style.color = formSettings.changePrefBtn.Color;
    changePrefSettingsButton.style.fontWeight = "500";
    changePrefSettingsButton.style.backgroundColor = formSettings.changePrefBtn.BackgroundColor;
    changePrefSettingsButton.addEventListener('click', function () {
      popUpSection.style.display = "block";
    });
    buttonsDiv.appendChild(changePrefSettingsButton);
    if (!formSettings.changePrefBtn.IsActive) {
      changePrefSettingsButton.style.display = 'none';
    }

    ccSection.appendChild(buttonsDiv);

    console.log("After new element");

    //create new element
    var popUpSection = document.createElement("section");

    //Model pop code
    //<div id="myModal" class="modal">
    popUpSection.classList.add("dialog")
    // Modal content 
    var popUpContent = document.createElement("div");
    popUpContent.classList.add("dialog-content");
    if (formSettings.paletteColor === 'dark') {
      popUpContent.style.backgroundColor = '#212529';
      popUpContent.style.color = 'white';
      popUpContent.style.border = 'none';
    }

    var headerDiv = document.createElement("div");
    headerDiv.classList.add("dialog-header");
    if (formSettings.paletteColor === 'dark') {
      headerDiv.style.color = 'white';
    }
    headerDiv.innerHTML = "Privacy Overview";
    popUpContent.appendChild(headerDiv);

    //close button 'X'
    var span = document.createElement("span");
    span.classList.add("close");
    if (formSettings.paletteColor === 'dark') {
      span.style.color = 'white';
    }
    span.innerHTML = "&times";
    headerDiv.appendChild(span);
    span.addEventListener('click', function () {
      popUpSection.style.display = "none";
    });
    if (formSettings.preferences_center_close_button_hide) {
      span.style.display = 'none';
    }

    //Add body
    var bodyDiv = document.createElement("div");
    bodyDiv.classList.add("dialog-body");
    popUpContent.appendChild(bodyDiv);

    //Add text
    var dialogText = document.createElement("p");
    dialogText.innerHTML = "This website uses cookies to improve your experience while you navigate through the website. Out of these, the cookies that are categorized as necessary are stored on your browser as they are essential for the working of basic functionalities of the website. We also use third-party cookies that help us analyze and understand how you use this website. These cookies will be stored in your browser only with your consent. You also have the option to opt-out of these cookies. But opting out of some of these cookies may affect your browsing experience.";
    bodyDiv.appendChild(dialogText);

    //Add horizontal tab
    var horizontalTab = document.createElement("div");
    horizontalTab.style.background = "gray";

    var tabHeader = document.createElement("div");
    var tabHeaderText = document.createElement("p");
    tabHeaderText.innerHTML = "Advertisement Cookies";
    tabHeader.appendChild(tabHeaderText);
    tabHeader.style.float = "left";
    horizontalTab.appendChild(tabHeader);

    //Add toggle switch
    var switchLabel = document.createElement("label");
    switchLabel.classList.add("switch");
    var switchInput = document.createElement("input");
    switchInput.setAttribute("type", "checkbox");
    var switchSliderSpan = document.createElement("span");
    switchSliderSpan.classList.add("slider");
    switchSliderSpan.classList.add("round");
    switchLabel.appendChild(switchInput);
    switchLabel.appendChild(switchSliderSpan);

    // bodyDiv.appendChild(switchLabel);

    //Collapsible buttons / content
    //Bellow funcanality of collapsible will be developed using loop
    if (formSettings.cookieCategories.length > 0) {
      formSettings.cookieCategories.forEach((cat, index) => {
        var collapsibleBtn = "collapsibleBtn_" + index;
        collapsibleBtn = document.createElement("button");
        collapsibleBtn.classList.add("collapsible");
        collapsibleBtn.innerHTML = cat.Name;
        if (index == 0) {
          var switchLabel = document.createElement("label");
          switchLabel.innerHTML = "Always Enabled";
          switchLabel.classList.add("switch");
          collapsibleBtn.appendChild(switchLabel);
        } else {
          //Append Switch control
          appendSwitch(collapsibleBtn, formSettings, cat.IsEnabled, false);
        }
        //Append Inner Content and Settings
        var collapsibleContent = "collapsibleContent_" + index;
        collapsibleContent = document.createElement("div");
        collapsibleContent.classList.add("collapsible-content");
        //change palette color 
        if (formSettings.paletteColor === 'dark') {
          collapsibleContent.style.backgroundColor = '#333';
          collapsibleContent.style.color = 'white';
        }
        var collapsibleText = "collapsibleText_" + index;
        collapsibleText = document.createElement("p");
        //append inner text
        switch (cat.Name) {
          case "Necessary":
            collapsibleText.innerHTML = "Necessary cookies are absolutely essential for the website to function properly. These cookies ensure basic functionalities and security features of the website, anonymously.";
            break;
          case "Functional":
            collapsibleText.innerHTML = "Functional cookies help to perform certain functionalities like sharing the content of the website on social media platforms, collect feedbacks, and other third-party features.";
            break;
          case "Performance":
            collapsibleText.innerHTML = "Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.";
            break;
          case "Analytical":
            collapsibleText.innerHTML = "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics the number of visitors, bounce rate, traffic source, etc.";
            break;
          case "Advertisement":
            collapsibleText.innerHTML = "Advertisement cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads.";
            break;
          case "Others":
            collapsibleText.innerHTML = "Other uncategorized cookies are those that are being analyzed and have not been classified into a category as yet.";
            break;
          default:
            collapsibleText.innerHTML = "Cookies are those that are being analyzed and have not been classified into a category as yet.";
            break;
        }
        collapsibleContent.appendChild(collapsibleText);

        //create and add data/cookies in tabels dynamicaly
        if (formSettings.cookiesTabel && formSettings.cookiesTabel.length > 0) {
          formSettings.cookiesTabel.forEach((tabelContent, index) => {
            let table = "tabel_" + index;
            if (tabelContent.Type == cat.Name) {
              //create tabel elements
              table = document.createElement('table');
              let thead = document.createElement('thead');

              // Creating and adding data to header row of the table
              let rowHead = "row_" + index;
              rowHead = document.createElement('tr');
              let heading_1 = document.createElement('th');
              heading_1.innerHTML = "Name";
              let heading_2 = document.createElement('th');
              heading_2.innerHTML = "Duration";
              let heading_3 = document.createElement('th');
              heading_3.innerHTML = "Description";
              let heading_4 = document.createElement('th');
              heading_4.innerHTML = "Type";

              rowHead.appendChild(heading_1);
              rowHead.appendChild(heading_2);
              rowHead.appendChild(heading_3);
              rowHead.appendChild(heading_4);

              thead.appendChild(rowHead);

              //adding head row to boday
              let tbody = document.createElement('tbody');
              table.appendChild(thead);

              //adding data rows
              let row = "row_" + index;
              row = document.createElement('tr');

              //adding td data dynamicly
              Object.values(tabelContent).forEach((val, index) => {
                var td = "td_" + index;
                td = document.createElement("td");
                td.innerHTML = val;
                row.appendChild(td);

              });

              tbody.appendChild(row);
              table.appendChild(tbody);
              collapsibleContent.appendChild(table);
            }
          });
        }

        collapsibleBtn.appendChild(collapsibleContent);
        var breakLine = document.createElement("br");
        bodyDiv.appendChild(collapsibleBtn);
        bodyDiv.appendChild(breakLine);
        bodyDiv.appendChild(breakLine);

      });
    }
    // var collapsibleBtn_1 = document.createElement("button");
    // collapsibleBtn_1.classList.add("collapsible");
    // collapsibleBtn_1.innerHTML = "Necessary (Always Enabled)";
    // appendSwitch(collapsibleBtn_1, formSettings, true, false);
    // var collapsibleContent_1 = document.createElement("div");
    // collapsibleContent_1.classList.add("collapsible-content");
    // if (formSettings.paletteColor === 'dark') {
    //   collapsibleContent_1.style.backgroundColor = '#333';
    //   collapsibleContent_1.style.color = 'white';
    // }
    // var collapsibleText_1 = document.createElement("p");
    // collapsibleText_1.innerHTML = "Necessary cookies are absolutely essential for the website to function properly. These cookies ensure basic functionalities and security features of the website, anonymously.";
    // collapsibleContent_1.appendChild(collapsibleText_1);
    // collapsibleBtn_1.appendChild(collapsibleContent_1);
    // var breakLine = document.createElement("br");
    // bodyDiv.appendChild(collapsibleBtn_1);
    // bodyDiv.appendChild(breakLine);
    // bodyDiv.appendChild(breakLine);


    // //button 2
    // var collapsibleBtn_2 = document.createElement("button");
    // collapsibleBtn_2.classList.add("collapsible");
    // collapsibleBtn_2.innerHTML = "Functional";
    // appendSwitch(collapsibleBtn_2, formSettings, false, false);
    // var collapsibleContent_2 = document.createElement("div");
    // collapsibleContent_2.classList.add("collapsible-content");
    // if (formSettings.paletteColor === 'dark') {
    //   collapsibleContent_2.style.backgroundColor = '#333';
    //   collapsibleContent_2.style.color = 'white';
    // }
    // var collapsibleText_2 = document.createElement("p");
    // collapsibleText_2.innerHTML = "Functional cookies help to perform certain functionalities like sharing the content of the website on social media platforms, collect feedbacks, and other third-party features.";
    // collapsibleContent_2.appendChild(collapsibleText_2);
    // collapsibleBtn_2.appendChild(collapsibleContent_2);
    // bodyDiv.appendChild(collapsibleBtn_2);
    // bodyDiv.appendChild(breakLine);

    // //button 3
    // var collapsibleBtn_3 = document.createElement("button");
    // collapsibleBtn_3.classList.add("collapsible");
    // collapsibleBtn_3.innerHTML = "Performance";
    // appendSwitch(collapsibleBtn_3, formSettings, false, false);
    // var collapsibleContent_3 = document.createElement("div");
    // collapsibleContent_3.classList.add("collapsible-content");
    // if (formSettings.paletteColor === 'dark') {
    //   collapsibleContent_3.style.backgroundColor = '#333';
    //   collapsibleContent_3.style.color = 'white';
    // }
    // var collapsibleText_3 = document.createElement("p");
    // collapsibleText_3.innerHTML = "Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.";
    // collapsibleContent_3.appendChild(collapsibleText_3);
    // collapsibleBtn_3.appendChild(collapsibleContent_3);
    // bodyDiv.appendChild(collapsibleBtn_3);
    // bodyDiv.appendChild(breakLine);


    // //button 4
    // var collapsibleBtn_4 = document.createElement("button");
    // collapsibleBtn_4.classList.add("collapsible");
    // collapsibleBtn_4.innerHTML = "Analytics";
    // appendSwitch(collapsibleBtn_4, formSettings, false, false);
    // var collapsibleContent_4 = document.createElement("div");
    // collapsibleContent_4.classList.add("collapsible-content");
    // if (formSettings.paletteColor === 'dark') {
    //   collapsibleContent_4.style.backgroundColor = '#333';
    //   collapsibleContent_4.style.color = 'white';
    // }
    // var collapsibleText_4 = document.createElement("p");
    // collapsibleText_4.innerHTML = "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics the number of visitors, bounce rate, traffic source, etc.";
    // collapsibleContent_4.appendChild(collapsibleText_4);
    // collapsibleBtn_4.appendChild(collapsibleContent_4);
    // bodyDiv.appendChild(collapsibleBtn_4);
    // bodyDiv.appendChild(breakLine);

    // //button 5
    // var collapsibleBtn_5 = document.createElement("button");
    // collapsibleBtn_5.classList.add("collapsible");
    // collapsibleBtn_5.innerHTML = "Advertisement";
    // appendSwitch(collapsibleBtn_5, formSettings, false, false);
    // var collapsibleContent_5 = document.createElement("div");
    // collapsibleContent_5.classList.add("collapsible-content");
    // if (formSettings.paletteColor === 'dark') {
    //   collapsibleContent_5.style.backgroundColor = '#333';
    //   collapsibleContent_5.style.color = 'white';
    // }
    // var collapsibleText_5 = document.createElement("p");
    // collapsibleText_5.innerHTML = "Advertisement cookies are used to provide visitors with relevant ads and marketing campaigns. These cookies track visitors across websites and collect information to provide customized ads.";
    // collapsibleContent_5.appendChild(collapsibleText_5);
    // collapsibleBtn_5.appendChild(collapsibleContent_5);
    // bodyDiv.appendChild(collapsibleBtn_5);
    // bodyDiv.appendChild(breakLine);

    // //button 6
    // var collapsibleBtn_6 = document.createElement("button");
    // collapsibleBtn_6.classList.add("collapsible");
    // collapsibleBtn_6.innerHTML = "Others";
    // appendSwitch(collapsibleBtn_6, formSettings, false, false);
    // var collapsibleContent_6 = document.createElement("div");
    // collapsibleContent_6.classList.add("collapsible-content");
    // if (formSettings.paletteColor === 'dark') {
    //   collapsibleContent_6.style.backgroundColor = '#333';
    //   collapsibleContent_6.style.color = 'white';
    // }
    // var collapsibleText_6 = document.createElement("p");
    // collapsibleText_6.innerHTML = "Other uncategorized cookies are those that are being analyzed and have not been classified into a category as yet.";
    // collapsibleContent_6.appendChild(collapsibleText_6);
    // collapsibleBtn_6.appendChild(collapsibleContent_6);
    // bodyDiv.appendChild(collapsibleBtn_6);
    // bodyDiv.appendChild(breakLine);


    //     var collapsible = document.getElementsByClassName("collapsible");
    //     collapsible.addEventListener('click' , , false ) ; 
    //     var i;
    //     collapsible.addEventListener('click', function() {
    // alert("clicked")      });


    // for (i = 0; i < collapsible.length; i++) {
    //     collapsible[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.maxHeight){
    //       content.style.maxHeight = null;
    //     } else {
    //       content.style.maxHeight = content.scrollHeight + "px";
    //     } 
    //   });
    //}


    var footerDiv = document.createElement("div");
    footerDiv.classList.add("dialog-footer");
    popUpContent.appendChild(footerDiv);
    var acceptAllBtn = document.createElement("input");
    acceptAllBtn.classList.add("save-accept-btn");
    acceptAllBtn.style.backgroundColor = formSettings.secondaryColor;
    acceptAllBtn.setAttribute("type", "button");
    acceptAllBtn.value = "Save & Accept";
    acceptAllBtn.addEventListener('click', function () {
      popUpSection.style.display = "none";
      updateCookies();
    });

    footerDiv.appendChild(acceptAllBtn);
    popUpSection.appendChild(popUpContent);
    document.body.appendChild(popUpSection);
  }
}

function changeSwitch(switchInput, customColor) {
  const cookie = switchInput.parentElement.parentElement.childNodes[0].data;
  if (switchInput.checked) {
    switchInput.parentElement.lastChild.style.backgroundColor = customColor;
    console.log("set cookie ON:" + switchInput.parentElement.parentElement.childNodes[0].data);
    // let index = acceptedCookies.length;
    //   acceptedCookies[index] = cookie;
    acceptedCookies[cookie] = true;
  }
  else {
    switchInput.parentElement.lastChild.style.backgroundColor = "#ccc";
    console.log("set cookie OFF:" + switchInput.parentElement.parentElement.childNodes[0].data);
    acceptedCookies[cookie] = false;

    // const index = acceptedCookies.indexOf(cookie);
    // if (index > -1) {
    //   acceptedCookies.splice(index, 1);
    // }
    // return acceptedCookies;
  }
};

function appendSwitch(parentDiv, paramObject, checked, disabled) {
  //Add toggle switch
  var switchLabel = document.createElement("label");
  switchLabel.classList.add("switch");
  var switchInput = document.createElement("input");
  switchInput.setAttribute("type", "checkbox");
  switchInput.checked = checked;
  switchInput.disabled = checked ? "disabled" : false;
  switchInput.addEventListener("change", function () {
    changeSwitch(switchInput, paramObject.secondaryColor);
  });
  var switchSliderSpan = document.createElement("span");
  switchSliderSpan.classList.add("slider");
  switchSliderSpan.classList.add("round");
  switchLabel.appendChild(switchInput);
  switchLabel.appendChild(switchSliderSpan);
  if (switchInput.disabled) {
    switchInput.parentElement.lastChild.style.backgroundColor = paramObject.secondaryColor;
  }

  parentDiv.appendChild(switchLabel);
};


// window.load = () => {

//     const acceptFn = event => {
//       alert("acceptFunc");
//         saveToStorage(storageType);
//         consentPopup.classList.add('hidden');
//     }
//     const consentPopup = document.getElementById('cookie-container');
//     const acceptBtn = document.getElementById('acceptButton');
//     acceptBtn.addEventListener('click', acceptFn);

//     if (shouldShowPopup(storageType)) {
//         setTimeout(() => {
//             consentPopup.classList.remove('hidden');
//         }, 2000);
//     }

// };

window.addEventListener('DOMContentLoaded', function () {
  console.log('All assets are loaded');
  //var cookieStore = [];

  const acceptFunc = event => {
    var popUp = consentPopup;
    setCookies(popUp);
    // if (!cookieStore.length > 0) {
    //   cookieStore.push(JSON.stringify(defaultCookies));
    // }

  }
  const declineFunc = event => {
    var popUp = consentPopup;
    defaultCookies = {
      'Necessary': true,
      'Functional': false,
      'Performance': false,
      'Analytics': false,
      'Advertisement': false,
      'Others': false
    };
    setCookies(popUp);
    // cookieStore.push(JSON.stringify(cookieStore));
    // saveToStorage(storageType);
    // alert("Saving Cookie: " + this.cookieStore);
    // alert("Saving Cookie: " + JSON.stringify(cookieStore));
    // consentPopup.style.display = 'none';
  }
  //Accept Cookies
  const consentPopup = document.getElementById('cookie-container');
  const acceptBtn = document.getElementById('acceptButton');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', acceptFunc);
  }

  //Decline Cookies
  const declineBtn = document.getElementById('declineButton');
  if (declineBtn) {
    declineBtn.addEventListener('click', declineFunc);
  }

  if (shouldShowPopup(storageType)) {
    setTimeout(() => {
      if (consentPopup) {
        consentPopup.style.display = 'block';
      }
    }, 2000);
  }

  //var parentSection = this.document.getElementsByClassName("cookie-container");
  // if (obj.palette === 'dark') {
  //     for (let i=0; i < popUpContent.childElementCount; i++) {
  //         popU pContent.children[i].style.background = 'black';
  //         popUpContent.children[i].style.color = 'white';
  //         popUpContent.children[i].style.border = '2px solid';
  //     }
  // }
  const collapsibles = Array.from(document.getElementsByClassName('collapsible'));
  collapsibles.forEach(collapsible => {
    collapsible.addEventListener('click', function (event) {
      //ignore case when clicked on switch
      if (event.target.className == "slider round" || event.target.className == "slider round active" || event.target.className == "") {
        return;
      }
      else {
        //when clicked on collapse
        event.target.classList.toggle("active");
        var content = event.target.children[1];
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    });
  });

});
function updateCookies() {
  defaultCookies = acceptedCookies;
  //this.cookieStore.push(acceptedCookies);
  console.log("Accept: " + acceptedCookies);
  //console.log("Cookie Store: " + acceptedCookies);
}
function setCookies(consentPopup) {
  var settings =
  {
    cookieDomain: formSettings.domain,
    secure: ""
  }
  if (settings.cookieDomain != window.location.hostname) {
    alert("Domain not matched.");
    settings.cookieDomain = window.location.hostname;
  }
  if (window.location.protocol == "https:") {
    settings.secure = "Secure;"
  }

  var cookieName = consentPropertyName;

  var cookieValueJson = JSON.stringify(defaultCookies);
  var cookieValueEncoded = encodeURIComponent(cookieValueJson);

  //for fireFox/Chrome
  //const cookieString = cookieName + "=" + cookieValueEncoded +"Domain=.adfixus.com;max-age=31536000;Secure;";
  const cookieString = cookieName + "=" + cookieValueEncoded + ";Domain=" + settings.cookieDomain + ";" + settings.secure + "SameSite=Lax; max-age=31536000;";
  document.cookie = cookieString;
  if (document.cookie.length > 0) {
    consentPopup.style.display = 'none';
  }

  // //for Chrome
  // if (!document.cookie.length > 0) {
  //   //cookieSetString = `${cookieName}=${cookieValueEncoded}; SameSite=Lax; Secure; domain="${settings.cookieDomain};`;
  //   cookieSetString = `${cookieName}=${cookieValueEncoded};`;

  //   console.log("Setting cookie: " + cookieSetString);
  //   alert("Saving Cookie: " + JSON.stringify(cookieSetString));
  //   saveToStorage(cookieName, cookieSetString);

  // }
  // alert("Saving Cookie: " + this.cookieStore);
  // alert("Saving Cookie: " + JSON.stringify(acceptedCookies));
}