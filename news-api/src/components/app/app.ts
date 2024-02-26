import { NewsResponse, SourcesResponse } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const clickHandler = (e: PointerEvent) =>
            this.controller.getNews(e, (data: NewsResponse | undefined) => this.view.drawNews(data!));
        document.querySelector('.sources')!.addEventListener('click', clickHandler as EventListener);
        this.controller.getSources((data: SourcesResponse | undefined) => this.view.drawSources(data!));
    }
}

export default App;
