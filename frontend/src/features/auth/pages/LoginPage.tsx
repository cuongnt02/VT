import { TypographyH1 } from "@/features/common/Typography";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
	return (

		<div className="flex h-screen w-screen items-center justify-center">
			<div className="w-2/5">
				<TypographyH1 text="LOGIN" />
				<LoginForm />
			</div>
		</div>
	)
}
