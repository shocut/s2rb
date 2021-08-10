import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'

function LoginPopup({onAuthStateChange, onCancel}) {
    return <div className="authenticator">
        <button className="close-login" onClick={onCancel}>Cancel login</button>
        <AmplifyAuthenticator usernameAlias="email" handleAuthStateChange={onAuthStateChange}>
            <AmplifySignUp slot="sign-up" usernameAlias="email" formFields={[
                {
                    type: "email",
                    label: "Email",
                    placeholder: "Enter your email",
                    inputProps: { required: true, autocomplete: "username" },
                },
                {
                    type: "password",
                    label: "Password",
                    placeholder: "Enter a new password",
                    inputProps: { required: true, autocomplete: "new-password" },
                }]} />
        </AmplifyAuthenticator>
    </div>
}

export default LoginPopup