$("#cline").keyup(function(event){
    if(event.keyCode == 13){
        updateTerminal();
    }
});

function updateTerminal()
{
	var cli = document.getElementById('cline');
	$('#prompt').before(cli.value + '</br>');

	output = parse_input(cli.value);

	cli.value = "";
	$("#consolation").animate({
		scrollTop: $("#consolation").height()
	}, 300);
}

function error(command, parameter) {
	switch(command) {
	case "ls":
		if (parameter[0] == "-") {
			message = "ls: invalid option";
			message = message + " -- '" + parameter + "'";
			message += "\n";
			return message + "Try 'ls --help' for more information.";
		} else {
			return "ls: cannot access " + parameter + ": Not a valid option";
		}
		break;
	case "whatis":
		if (parameter[0] == "-") {
			message = "whatis: invalid option";
			message = message + " -- '" + parameter + "'";
			message += "\n";
			return message + "Try 'whatis --help' for more information.";
		} else {
			return parameter + ": nothing appropriate";
		}
		break;
	case "whoami":
		return "whoami: extra operand `" + parameter + "'\nTry 'whoami --help' for more information.";
		break;
	default:
		return "-fbcli: " + command + ": command not found";
	}
	return "";
}

function help(command) {
	switch(command) {
	case "ls":
		return whatis("ls") + "\n" + "Usage: ls";
		break;
	case "whatis":
		return whatis("whatis") + "\n" + "Usage: whatis KEYWORD";
		break;
	case "whoami":
		return whatis("whoami") + "\n" + "Usage: whoami";
		break;
	default:
		return error(command,"");
	}
	return "";
}

function whoami(args) {
	if (args == "--help") {
		return help("whoami");
	} else if (args == "") {
		name = "name";
		return name;
	} else {
		return error("whoami", args);
	}
	return "";
}

function whatis(command) {
	switch(command) {
	case "ls":
		return "ls (1)\t\t- list news feed contents";
		break;
	case "whatis":
		return "whatis (1)\t\t- display manual page descriptions";
		break;
	case "whoami":
		return "whoami (1)\t\t- prints effective user id";
		break;
	case "":
		return "whatis what?";
		break;
	case "--help":
		return help("whatis");
		break;
	default:
		return error("whatis", command);
	return "";
	}
}

function print_news_feed() {
	return "News Feed";
}

function print_friends() {
	return "List o' friends";
}

function ls(args) {
	if (args == "") {
		return print_news_feed();
	} else if (args == "--help") {
		return help("ls");
	} else {
		return error("ls", args);
	}
	return "";
}

function echo(message) {
	if (message.length == 0) {
		return "Invalid status";
	} else if (message == "--help") {
		return help("echo");
	} else if (message[0] == "-") {
		return error("echo", message);
	} else {
		return "The new status will be: " + message;
	}
	return "";
}

function parse_input(input) {
	input_arr = input.split(" ");
	input_arr_len = input_arr.length;
	switch(input_arr_len) {
	case 1:
		if (input_arr[0] == "ls") {
			return ls("");
		} else if (input_arr[0] == "whatis") {
			return whatis("");
		} else if (input_arr[0] == "whoami") {
			return whoami("");
		} else if (input_arr[0] == "") {
		} else {
			return error(input_arr[0], "");
		}
		break;
	case 2:
		if (input_arr[0] == "ls") {
			return ls(input_arr[1]);
		} else if (input_arr[0] == "whatis") {
			return whatis(input_arr[1]);
		} else if (input_arr[0] == "whoami") {
			return whoami(input_arr[1]);
		} else {
			return error(input_arr[0], "");
		}
		break;
	default:
		if (input_arr[0] == "ls") {
			return ls(input_arr[1] + input_arr[2]);
		} else if (input_arr[0] == "whatis") {
			for (i = 1; i < input_arr_len; i++) {
				return whatis(input_arr[i]);
			}
		} else if (input_arr[0] == "whoami") {
			return error(input_arr[0], input_arr[1] + input_arr[2]);
		} else {
			return error(input_arr[0], "");
		}
	}
	return "";
}
