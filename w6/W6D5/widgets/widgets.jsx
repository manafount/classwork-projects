import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
import Tabs from './tabs.jsx';

document.addEventListener("DOMContentLoaded", () => {
	let tabs = [{ title: "tab", content: "content" },
						  { title: "tab2", content: "content2" },
							{ title: "tab3", content: "content3" }];
	const main = document.getElementById("main");
	ReactDOM.render(<Tabs tabs={tabs}/>, main);
});
