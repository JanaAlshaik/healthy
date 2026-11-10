
/* =====================================
   RAFIQ - MAIN JAVASCRIPT
===================================== */

// بيانات الطفل التجريبية
let demoStudent = {
    name: "",
    grade: "",
    diabetesType: "",
    guardian: "",
    phone: "",
    nursePhone: "",
    plan: "",
    lowSugarLimit: "",
    lowSugarTreatment: ""
};

// Timer Variables
let timerSeconds = 15 * 60;
let timerInterval = null;
let timerRunning = false;


/* =====================================
   PAGE NAVIGATION
===================================== */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "teacher") {
        updateTeacherCard();
    }
}


/* =====================================
   UPDATE TEACHER CARD
===================================== */

function updateTeacherCard() {

    document.getElementById("displayName").textContent =
        demoStudent.name || "لم يتم تسجيل الطفل";

    document.getElementById("displayGrade").textContent =
        demoStudent.grade
        ? `${demoStudent.grade} · سكري ${demoStudent.diabetesType}`
        : "لم تتم إضافة البيانات";

    document.getElementById("studentInitial").textContent =
        demoStudent.name.trim().charAt(0) || "ط";

    document.getElementById("displayGuardian").textContent =
        demoStudent.guardian || "غير مضاف";

    document.getElementById("displayPhone").textContent =
        demoStudent.phone || "غير مضاف";

    document.getElementById("displayLowSugarLimit").textContent =
        demoStudent.lowSugarLimit
        ? demoStudent.lowSugarLimit + " mg/dL"
        : "غير محدد";

    document.getElementById("displayLowSugarTreatment").textContent =
        demoStudent.lowSugarTreatment || "غير محدد";

    document.getElementById("displayPlan").textContent =
        demoStudent.plan || "لا توجد ملاحظات";

        document.getElementById("teacherTreatment").textContent =
    demoStudent.lowSugarTreatment || "لم يتم تحديد العلاج";

    document.getElementById("teacherCarePlan").textContent =
        demoStudent.plan || "لا توجد تعليمات متابعة مسجلة";
}


/* =====================================
   PARENT FORM - SAVE DATA
===================================== */

document.getElementById("parentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const consent = document.getElementById("consent").checked;
    const message = document.getElementById("parentMessage");

    // Check consent
    if (!consent) {

        message.textContent =
            "يرجى تأكيد الموافقة أولاً.";

        message.style.color = "#FF7770";

        return;
    }

    // Collect parent information
    demoStudent = {

        name: document.getElementById("childName").value.trim(),

        grade: document.getElementById("childGrade").value,

        diabetesType: document.getElementById("diabetesType").value,

        guardian: document.getElementById("guardianName").value.trim(),

        phone: document.getElementById("guardianPhone").value.trim(),

        nursePhone: document.getElementById("nursePhone").value.trim(),

        plan: document.getElementById("carePlan").value.trim(),

        lowSugarLimit: document.getElementById("lowSugarLimit").value,

        lowSugarTreatment: document.getElementById("lowSugarTreatment").value

    };

    // Update teacher card
    updateTeacherCard();

    // Show success message
    message.textContent =
        "✓ تم حفظ بيانات الطفل بنجاح!";

    message.style.color = "#55C9BD";

});


/* =====================================
   TEACHER - CONSCIOUSNESS CHECK
===================================== */

function chooseConscious(isConscious) {

    document.getElementById("consciousPanel")
        .classList.toggle("hidden", !isConscious);

    document.getElementById("unconsciousPanel")
        .classList.toggle("hidden", isConscious);

    document.getElementById("alertMessage").textContent = "";

    document.getElementById("emergencyMessage").textContent = "";

    if (!isConscious) {
        stopTimer();
    }

    document.getElementById(
        isConscious ? "consciousPanel" : "unconsciousPanel"
    ).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =====================================
   TIMER
===================================== */

function renderTimer() {

    const minutes = String(
        Math.floor(timerSeconds / 60)
    ).padStart(2, "0");

    const seconds = String(
        timerSeconds % 60
    ).padStart(2, "0");

    document.getElementById("timerDisplay").textContent =
        `${minutes}:${seconds}`;
}


function toggleTimer() {

    const button = document.getElementById("timerButton");

    if (timerRunning) {

        stopTimer();

        button.textContent = "متابعة المؤقت";

        return;
    }

    if (timerSeconds <= 0) {
        timerSeconds = 15 * 60;
    }

    timerRunning = true;

    button.textContent = "إيقاف مؤقت";

    timerInterval = setInterval(() => {

        timerSeconds--;

        renderTimer();

        if (timerSeconds <= 0) {

            stopTimer();

            button.textContent = "إعادة البدء";

            document.getElementById("alertMessage").textContent =
                "انتهى المؤقت . اتبع الخطة الطبية المعتمدة وتواصل مع الممرضة.";

        }

    }, 1000);
}


function stopTimer() {

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = null;

    timerRunning = false;
}


function resetTimer() {

    stopTimer();

    timerSeconds = 15 * 60;

    renderTimer();

    document.getElementById("timerButton").textContent =
        "ابدأ المؤقت";
}


/* =====================================
   ALERT SIMULATION
===================================== */

function simulateAlert() {

    const text =
        "تم إرسال رسالة الى اهل الطالب.";

    const consciousMessage =
        document.getElementById("alertMessage");

    const emergencyMessage =
        document.getElementById("emergencyMessage");

    if (!document.getElementById("consciousPanel").classList.contains("hidden")) {

        consciousMessage.textContent = text;

    } else {

        emergencyMessage.textContent = text;

    }
}


/* =====================================
   SCHOOL NOTES
===================================== */

function saveSchoolNote() {

    const note =
        document.getElementById("schoolNote").value.trim();

    const message =
        document.getElementById("schoolMessage");

    message.textContent = note
        ? "تم تسجيل الملاحظة في واجهة العرض لهذه الجلسة فقط."
        : "اكتب ملاحظة أولًا.";
}


/* =====================================
   INITIALIZE APP
===================================== */

renderTimer();

updateTeacherCard();
