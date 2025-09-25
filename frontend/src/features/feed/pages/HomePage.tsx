import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const HomePage = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	return (
		<NavigationMenu className="m-auto">
			<NavigationMenuList className="w-[80vw] p-1 mt-4 border-4 border-muted rounded-md gap-x-4"  >
				<div className="flex ml-auto mr-8">
					{!loggedIn ? (<>
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
					</>) : (
						<>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link to="/login" className="text-xl font-medium">
										<Avatar>
											<AvatarImage src="" alt="User Avatar" />
											<AvatarFallback><User /></AvatarFallback>
										</Avatar>
									</Link>
								</NavigationMenuLink >
							</NavigationMenuItem >
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link to="/logout" className="text-xl font-medium" >Logout</Link>
								</NavigationMenuLink >
							</NavigationMenuItem >

						</>)}
				</div>
			</NavigationMenuList >
		</NavigationMenu >
	)
}

export default HomePage;
