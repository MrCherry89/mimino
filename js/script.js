$(document).ready(function () {
  $(".drop-menu").on("click", function (e) {
    e.preventDefault();
    $(".menu-wrap").addClass("open");
    $("body, html").addClass("overflow");
  });

  $(".close-menu").on("click", function (e) {
    e.preventDefault();
    $(".menu-wrap").removeClass("open");
    $("body, html").removeClass("overflow");
  });

  $(".button_su_inner").mouseenter(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".button_circle").css({
      left: relX,
      top: relY,
    });
    $(this).prev(".button_circle").removeClass("desplode-circle");
    $(this).prev(".button_circle").addClass("explode-circle");
  });

  $(".button_su_inner").mouseleave(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".button_circle").css({
      left: relX,
      top: relY,
    });
    $(this).prev(".button_circle").removeClass("explode-circle");
    $(this).prev(".button_circle").addClass("desplode-circle");
  });

  $(".video-play").on("click", function () {
    $(".video-info").hide();
  });

  const btnOk = document.querySelector(".btn-ok");
  const wrapperVideo = document.getElementById("fon");

  btnOk.addEventListener("click", function () {
    wrapperVideo.play();
  });

  $(".select-wrap select").select2({
    minimumResultsForSearch: -1,
  });

  var step_number = 0;

  function changeStepNumber(block) {
    $(block).find(".answer-info .step-number").text(step_number);
    $(".header .numbers .step-number").text(step_number);

    var progress = step_number * 25;
    $(".progress-bar .persent-number").css("width", progress + "%");
    $(".progress-bar .persent-number span").text(progress);
  }

  function onQuestionSelect(element) {
    var value = element.val();
    if (value) {
      element
        .closest(".question")
        .find(".button-hover")
        .removeClass("disabled")
        .attr("disabled", false);
    }
  }

  function onQuestionSend(block) {
    step_number += 1;

    $(block).find(".question-info").addClass("hidden");
    $(block).find(".answer-info").removeClass("hidden");
    $(block).find(".img-wrap").addClass("style");

    if (step_number === 4) {
      $(".header .numbers").hide();
    }
  }

  function onQuestionBack(block) {
    $(block).find(".question-info").removeClass("hidden");
    $(block).find(".answer-info").addClass("hidden");
    $(block).find(".img-wrap").removeClass("style");
    step_number -= 1;

    $(block)
      .find(".question-info .button-hover")
      .addClass("disabled")
      .attr("disabled", true);

    $(".header .numbers").show();
  }

  // Question 1 - start
  $("#question1 .radio-wrap input").on("change", function () {
    onQuestionSelect($(this));
  });

  $("#question1 .button-hover").on("click", function () {
    onQuestionSend("#question1");
    var answer = $("#question1 .radio-wrap input:checked").val();
    $("#question1 .answer-info .selected span").text(answer);
    changeStepNumber("#question1");
  });

  $("#question1 .back").on("click", function (e) {
    e.preventDefault();
    onQuestionBack("#question1");
    changeStepNumber("#question1");
    $("#question1 .radio-wrap input:checked").prop("checked", false);
  });
  // Question 1 - end

  // Question 2 - start
  $("#question2 .select-wrap select").on("select2:select", function (e) {
    onQuestionSelect($(this));
  });

  $("#question2 .button-hover").on("click", function () {
    onQuestionSend("#question2");
    var answer = $("#question2 .select-wrap select").val();
    $("#question2 .answer-info .selected span").text(answer);
    $("#question2 .answer-info .selected-city").text(answer);
    changeStepNumber("#question2");
    $("#question1 .img-wrap").addClass("hide-img2");
  });

  $("#question2 .back").on("click", function (e) {
    e.preventDefault();
    onQuestionBack("#question2");
    changeStepNumber("#question2");
    $("#question2 .select-wrap select").val("").trigger("change");
    $("#question1 .img-wrap").removeClass("hide-img2");
  });
  // Question 2 - end

  // Question 3 - start
  $("#question3 .radio-wrap input").on("change", function () {
    onQuestionSelect($(this));
  });

  $("#question3 .button-hover").on("click", function () {
    onQuestionSend("#question3");
    var answer = $("#question3 .radio-wrap input:checked").val();
    $("#question3 .answer-info .selected span").text(answer);
    changeStepNumber("#question3");
  });

  $("#question3 .back").on("click", function (e) {
    e.preventDefault();
    onQuestionBack("#question3");
    changeStepNumber("#question3");
    $("#question3 .radio-wrap input:checked").prop("checked", false);
  });
  // Question 3 - end

  // Question 4 - start
  $("#question4 input").on("input", function (e) {
    onQuestionSelect($(this));
  });

  $("#question4 .button-hover").on("click", function () {
    onQuestionSend("#question4");
    var answer = $("#question4 input").val();
    $("#question4 .answer-info .selected span").text(answer);
    changeStepNumber("#question4");
  });

  $("#question4 .back").on("click", function (e) {
    e.preventDefault();
    onQuestionBack("#question4");
    changeStepNumber("#question4");
    $("#question4 input").val("").trigger("change");
  });
  // Question 4 - end

  $(".popup").magnificPopup({
    type: "inline",
    mainClass: "mfp-fade",
    removalDelay: 500,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr("data-effect");
      },
    },
  });

  $("#form").validate({
    rules: {
      email: {
        required: true,
      },
      checkbox: {
        required: true,
      },
    },
  });
});
