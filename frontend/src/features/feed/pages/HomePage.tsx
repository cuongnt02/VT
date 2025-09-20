import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router";

const HomePage = () => {
	return (
		<NavigationMenu className="m-auto">
			<NavigationMenuList className="w-[80vw] p-1 mt-4 border-4 border-muted rounded-md gap-x-4"  >
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link to="/login" className="text-xl font-medium" >Login</Link>
					</NavigationMenuLink >
				</NavigationMenuItem >
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<Link to="/register" className="text-xl font-medium" >Register</Link>
					</NavigationMenuLink >
				</NavigationMenuItem >
			</NavigationMenuList >
		</NavigationMenu >
	)
}

export default HomePage;
