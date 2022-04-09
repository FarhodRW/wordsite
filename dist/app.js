"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const user_router_1 = __importDefault(require("./src/router/user.router"));
const tag_router_1 = __importDefault(require("./src/router/tag.router"));
const word_router_1 = __importDefault(require("./src/router/word.router"));
const quiz_router_1 = __importDefault(require("./src/router/quiz/quiz.router"));
const quiz_item_route_1 = __importDefault(require("./src/router/quiz/quiz-item.route"));
const quiz_history_service_1 = require("./src/service/quiz/quiz-history.service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true
}));
//db connection
mongoose_1.default.connect(String(process.env.DBURL))
    .then(() => console.log('Connected to database'))
    .catch(() => console.log("Can't connect to the database"));
mongoose_1.default.set('debug', true);
node_cron_1.default.schedule('*/2 * * * * *', () => {
    quiz_history_service_1.quizHistoryService.checkTimeLimit();
});
//middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
//routes
app.use('/user', user_router_1.default);
app.use('/tag', tag_router_1.default);
app.use('/word', word_router_1.default);
app.use('/quiz', quiz_router_1.default);
app.use('/quiz-item', quiz_item_route_1.default);
//error handler
app.use((err, req, res, next) => {
    res.status(400).send(err);
});
//port listener
app.listen(String(process.env.PORT), () => {
    console.log(`started on port ${String(process.env.PORT)}`);
});
