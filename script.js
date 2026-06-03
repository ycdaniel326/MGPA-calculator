window.onload = function () {
    loadRecord();
  };
  
  function loadRecord() {
    const savedCredits = localStorage.getItem("currentCredits") || 0;
    const savedMgpa = localStorage.getItem("currentMgpa") || 0;
  
    document.getElementById("currentCredits").value = savedCredits;
    document.getElementById("currentMgpa").value = savedMgpa;
  
    updateDisplay(savedCredits, savedMgpa);
  }
  
  function updateDisplay(credits, mgpa) {
    document.getElementById("displayCredits").innerText = Number(credits);
    document.getElementById("displayMgpa").innerText = Number(mgpa).toFixed(3);
  }
  
  function toggleEditRecord() {
    document.getElementById("editRecordBox").classList.toggle("hidden");
  }
  
  function saveRecord() {
    const credits = Number(document.getElementById("currentCredits").value);
    const mgpa = Number(document.getElementById("currentMgpa").value);
  
    localStorage.setItem("currentCredits", credits);
    localStorage.setItem("currentMgpa", mgpa);
  
    updateDisplay(credits, mgpa);
  
    document.getElementById("editRecordBox").classList.add("hidden");
    document.getElementById("result").innerText = "Current record saved.";
  }
  
  function calculate() {
    const currentCredits = Number(document.getElementById("currentCredits").value);
    const currentMgpa = Number(document.getElementById("currentMgpa").value);
    const courseCredits = Number(document.getElementById("courseCredits").value);
    const grade = Number(document.getElementById("grade").value);
  
    const newCredits = currentCredits + courseCredits;
  
    const newMgpa =
      (currentCredits * currentMgpa + courseCredits * grade) / newCredits;
  
    return {
      newCredits: newCredits,
      newMgpa: newMgpa
    };
  }
  
  function testGrade() {
    const result = calculate();
  
    document.getElementById("result").innerText =
      "Number of Credits: " + result.newCredits +
      "\nForecasted MGPA: " + result.newMgpa.toFixed(3);
  }

  function addGrade() {
    const result = calculate();

    const credits = document.getElementById("courseCredits").value;

    const gradeSelect = document.getElementById("grade");
    const gradeText = gradeSelect.options[gradeSelect.selectedIndex].text;
  
    localStorage.setItem("currentCredits", result.newCredits);
    localStorage.setItem("currentMgpa", result.newMgpa.toFixed(3));
  
    document.getElementById("currentCredits").value = result.newCredits;
    document.getElementById("currentMgpa").value = result.newMgpa.toFixed(3);
  
    updateDisplay(result.newCredits, result.newMgpa);
  
    document.getElementById("result").innerText =
      "Actual grade added.\nNew Credits: " + result.newCredits +
      "\nNew MGPA: " + result.newMgpa.toFixed(3);

    const historyList = document.getElementById("historyList");
    const li = document.createElement("li");
      
    li.textContent = credits + " credits - " + gradeText;
      
    historyList.prepend(li);
  }