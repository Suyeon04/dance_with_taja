const roomSchema = new Schema({
    title: { // 방 제목
        type: String,
        required: true,
    },
    max: { // 최대 수용 인원
        type: Number,
        required: true,
        default: 2, // 기본적으로 10명
        max: 1, // 최eo 인원 2명
    },
    owner: { // 방장
        type: String,
        required: true,
    },
    createdAt: { // 생성 시간
        type: Date,
        default: Date.now,
    },
});