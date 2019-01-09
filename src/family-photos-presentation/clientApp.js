const clientApp = `
const App = () => {
  return (
    <Router>
      <div>
        <AuthButton />
        <LoginForm />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/photofeed">Protected Photo Feed</Link>
          </li>
        </ul>
        <Route path="/public" component={Public} />
        <PrivateRoute path="/photofeed" component={PhotoFeed} />
      </div>
    </Router>
  );
};
`;
export default clientApp;