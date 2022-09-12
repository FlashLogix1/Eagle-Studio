import {Layout} from "antd";
import {Route, Switch} from "react-router";
import {Home} from "../pages/Home";
import {GameTemplate} from "../pages/GameTemplate";
import {AppTemplate} from "../pages/AppTemplate";
import {HotDeals} from "../pages/HotDeals";
import {Ready2Use} from "../pages/Ready2Use";
export const MainLayout = () => {
    return(
        <Layout>
            <div style={{ paddingLeft: 50, paddingRight: 50 }}>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/game-template" exact>
                        <GameTemplate />
                    </Route>
                    <Route path="/app-template" exact>
                        <AppTemplate />
                    </Route>
                    <Route path="/limited-offer" exact>
                        <HotDeals />
                    </Route>
                    <Route path="/reskinned-express" exact>
                        <Ready2Use />
                    </Route>
                </Switch>
            </div>
        </Layout>
    )
}