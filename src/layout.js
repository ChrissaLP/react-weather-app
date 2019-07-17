const Layout = (props) => {
    return (
        <div>
            <p>header</p>
            {props.children}
            <p>footer</p>
        </div>
    );
};

const template = (
    <div>
        <h1>Page Title</h1>
        <p>this is my page.</p>
    </div>
);

ReactDOM.render((
    <Layout>
        <h1>Page title!</h1>
        <p>this is inline!</p>
    </Layout>
), document.getElementById('app'));