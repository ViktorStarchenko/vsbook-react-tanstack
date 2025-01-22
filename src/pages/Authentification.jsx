import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import axios from "axios";
import Input from "../components/elements/Input";
import ErrorBlock from "../components/ErrorsBlock/ErrorsBlock";
import classes from "../components/ErrorsBlock/ErrorsBlock.module.css";

export default function Authentification() {
    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    if(data && data.message){
        console.log(data.message)
    }
    return (
        <div className="wrapper-1220">
            <Form method="POST">
                {data && data.errors &&
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>}
                {data && data.message && (
                    <ul className={classes['errors-block-list']}>
                        <li className={classes['errors-block-item']}>{data.message}</li>
                    </ul>
                )}

                <div className="formInner">
                    <Input name="username" type="text" placeholder="Username"/>
                    <Input name="password" type="password" placeholder="Password"/>
                    <button disabled={isSubmitting} className="btn btnSubmit">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </div>
            </Form>
        </div>

    )
}

export async function action({request}) {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `https://a.vsbookcollection.space/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`,
        headers: {}
    };

    try {
        const response = await axios.request(config);
        console.log(response)
        const token = response.data.token;
        localStorage.setItem('token', token)
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());

        return redirect('/')
    } catch (error) {
        console.error('Error fetching token:', error);
        return error;
    }

}