//Select and cache the <main>element in a variable named mainEl.

const mainEl = document.querySelector("main");
let showingSubMenu = false;

//Set the background color of mainElto the value stored in the --main-bgCSS custom property.

mainEl.style.backgroundColor = "var(--main-bg)";

//Set the content of mainElto <h1>SEI Rocks!</h1>.

const heading = document.createElement("h1");
heading.textContent = "SEI Rocks";
mainEl.appendChild(heading);

//Add a class of flex-ctrto mainEl.
mainEl.classList.add("flex-ctr");

//Select and cache the <nav id="top-menu">element in a variable named topMenuEl.
const topMenuEl = document.querySelector("#top-menu");

////Select and cache the <nav id="sub-menu">element in a variable named subMenuEl.

const subMenuEl = document.querySelector("#sub-menu");

//Set the height topMenuElelement to be 100%.
//Set the height subMenuElelement to be 100%.

topMenuEl.style.height = "100%";
subMenuEl.style.height = "100%";

//Set the background color of topMenuElto the value stored in the --top-menu-bgCSS custom property.
//Set the background color of subMenuElto the value stored in the --sub-menu-bgCSS custom property.

topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

//Add a class of flex-aroundto topMenuEl.
//Add the class of flex-aroundto the subMenuElelement.

topMenuEl.classList.add("flex-around");
subMenuEl.classList.add("flex-around");

let sublinksArray = {};
let link_obj;

var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];
//console.log(menuLinks[0].href);

//Create an <a>element.
//On the new element, add an href attribute with its value set to the hrefproperty of the "link" object.
//Append the new element to the topMenuElelement.

menuLinks.forEach((menu) => {
  const alink = document.createElement("a");
  alink.setAttribute("href", menu.href);
  var linkText = document.createTextNode(menu.text.toUpperCase());
  //sublinksArray.push({menu.text:menu.subLinks});
  sublinksArray[menu.text.toUpperCase()] = menu.subLinks;
  alink.appendChild(linkText);
  alink.classList.add("active");
  //alink.style.textContent = menu.text;
  topMenuEl.appendChild(alink);
});

console.log("subLinksArray", sublinksArray);

//Set the CSS positionproperty of subMenuElto the value of absolute.

subMenuEl.style.position = "absolute";

//Set the CSS topproperty of subMenuElto the value of 0.

subMenuEl.style.top = 0;

//Select and cache the all of the <a>elements inside of topMenuElin a variable named topMenuLinks.

const topMenuLinks = topMenuEl.children;

//console.log(topMenuLinks)

topMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.localName !== "a") {
    return;
  } else {
    console.log(e.target.text);
  }
  if(e.target.classList.contains('active')){
    e.target.classList.remove('active');
    showingSubMenu = false;
    subMenuEl.top = 0;
    //return;
  }

  //Next, the event listener should remove a class name of activefrom each <a>element in topMenuLinks- whether the activeclass exists or not.

  for (let i of topMenuLinks) {
    i.classList.remove("active");
    console.log(i);
  }

  //Next, the event listener should add a class name of activeto the <a>element that was clicked.
  if (e.target.localName === "a") {
    e.target.classList.add("active");
  }

  //Set showingSubMenuto trueif the clicked <a>element's "link" object within menuLinkshas a subLinksproperty (all do, except for the "link" object for ABOUT), otherwise, set it to false.
  if (e.target.getAttribute("href") === "#") {
    showingSubMenu = true;
  } else {
    showingSubMenu = false;
  }
  //console.log(sublinksArray)
  //console.log(e.target.text);

  if (showingSubMenu) {
    buildSubMenu(e.target.text, sublinksArray);
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = 0;
    createHeaderElement(e.target.text)
  }
});

function buildSubMenu(menu_name, submenuarray) {
  //console.log(subMenuEl)
  subMenuEl.innerHTML = "";
  //console.log('Inside buildsubmenu function',submenuarray);
  let submenu = submenuarray[menu_name];
  //console.log(submenu)
  submenu.forEach((menu) => {
    //console.log(menu);
    let smenu = document.createElement("a");
    smenu.setAttribute("href", menu.href);
    smenu.appendChild(document.createTextNode(menu.text.toUpperCase()));
    subMenuEl.appendChild(smenu);
  });
}


subMenuEl.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.localName !== "a") {
    return;
  } else {
    console.log(e.target.text);
  }
  showingSubMenu = false;
  subMenuEl.style.top = 0;

  for (let i of topMenuLinks) {
    i.classList.remove("active");
    console.log(i);
  }

  createHeaderElement(e.target.text);
  // let maincontent = document.createElement("h1");
  // maincontent.textContent = e.target.text;
  // mainEl.innerHTML = "";
  // mainEl.appendChild(maincontent);
})


function createHeaderElement(content){
  let maincontent = document.createElement("h1");
  maincontent.textContent = content;
  mainEl.innerHTML = "";
  mainEl.appendChild(maincontent);
}