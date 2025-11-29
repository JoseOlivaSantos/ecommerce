

export const Card = ({children}) => {
	return (
			<div className="card">
				{children}
			</div>
		);
}

export const Input = ({name, type="text", placeholder, onChange}) => {
	return (
			<input 
				className = "login-input"
				name={name}
				type = {type}
				placeholder = {placeholder}
				onChange = {onChange}
				required
			/>
		);
}