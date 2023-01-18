"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const Debug_1 = __importDefault(require("./utils/Debug"));
dotenv_1.default.config();
if (process.env.DEV === "TRUE")
    Debug_1.default.enabled = true;
else
    Debug_1.default.enabled = false;
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: process.env.ORIGIN_ALLOWED || "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)({}));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
// app.use(cookieParser());
app.use("/auth/", auth_route_1.default);
app.use("/user/", user_route_1.default);
app.get("/", (req, res) => {
    res.json({ message: "app is running properly ... ;}" });
});
app.use(ErrorHandler_1.default);
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(process.env.DB_URL)
    .then((res) => app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    Debug_1.default.success("Server is running ...");
})))
    .catch((err) => {
    Debug_1.default.error(err);
});
//# sourceMappingURL=index.js.map