import "./logInComponent.css"

import tsuDarkLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

const LogInComponent = () => {

    return (
        <>
            <article className="login-card">
                <section className="content-card">
                    <div className="up-block">
                        <img src={tsuDarkLogo} alt="logo" className="card-logo" />
                        <h2 className="card-title">Вход</h2>
                    </div>
                    <input type="text" />
                    <input type="text" />
                    <button>Вход</button>
                    <button>Создать аккаунт</button>
                </section>
            </article>
        </>
    )
};

export default LogInComponent;