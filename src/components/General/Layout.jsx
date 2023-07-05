import React from "react";
import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({uid}) => {
	return (
		<>
			<div className="flex h-full overflow-y-auto">
				<Sidebar uid={uid}/>
				<Drawer uid={uid}/>
				<div className="flex w-full flex-1 flex-col">
					<Header uid={uid}/>
					<div className="pl-0 pt-16 md:pl-64 lg:pl-64">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
