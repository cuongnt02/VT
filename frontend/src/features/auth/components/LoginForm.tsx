import type User from "@/data/model/user";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { v6 as uuidv6 } from "uuid"
import { useEffect, useState } from "react";
import LoadingSpinner from "@/features/common/Loading";
import { useNavigate } from "react-router";

const loginFormSchema = z.object({
	username: z.string().min(8, {
		message: "username must be at least 2 characters",
	}).max(50, {
		message: "username must be at most 50 characters",
	}),
	password: z.string().min(9, {
		message: "password must be at least 9 characters",
	}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/, {
		message: "password must contains at least 1 lowercase character, 1 uppercase character, 1 digit and 1 special character"
	})
})

export default function LoginForm() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")
	const [loggedIn, setLoggedIn] = useState<boolean>(false)
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: ""
		}
	})

	useEffect(() => {
		if (loggedIn) navigate('/')
	}, [loggedIn, navigate])

	return (
		<Form {...form}>
			{message &&
				(<p className="text-center leading-7 [&:not(:first-child)]:mt-6 text-red-500">{message}</p>)}
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"	>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg font-semibold">Username</FormLabel>
							<FormControl>
								<Input placeholder="Enter your username" {...field} />
							</FormControl>
							{/* TODO: Remove redundant description */}
							<FormDescription>
								This is your public display name
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg font-semibold">Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							{/* TODO: Remove redundant description */}
							<FormDescription>A strong password for your security</FormDescription>
							<FormMessage />
						</FormItem>

					)}
				/>
				<Button type="submit" className="w-full text-lg">{isLoading ? (<LoadingSpinner className="" />) : ("Submit")}</Button>
			</form>
		</Form>
	)

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		// TODO: Remove id field
		const user: User = { id: uuidv6().toString(), username: values['username'], password: values['password'] }
		setIsLoading(true)
	}

	function flashMessage(message: string) {
		setMessage(message)
	}
}

