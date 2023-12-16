import Authentication from "Features/Auth/Auth.index";
import Home from "Features/Home/home.index";
import ResultantText from "Features/Result/resultantText.index";
import MainHeader from "Layout/Header/header.index";
import MainLayout from "Layout/layout.index";
import { Layout } from "antd";
interface IPrivateRoutes {
	path: string;
	element: any;
	layout?: any;
}
export const PRIVATE_ROUTES : IPrivateRoutes[] = [
	{
		path: "/Home",
		element: Home
	},
	{
		path :"/result",
		element : ResultantText
	}
];

export const PUBLIC_ROUTES : any[]= [
	{
		path: "/",
		element: Authentication,
	}
];
