package com.ebayapp.DataRepo;

import com.ebayapp.users.User;
import java.util.HashMap;
import java.util.Map;
import com.google.gson.Gson;
public class DataRepoUtil {

	
	private static Map<String,User> dataMap= new HashMap<String,User>();
	private static User def = new User("defaultUser","default","password");

	static{
		dataMap.put(def.getLogin(),def);
	}
	public static void addUser(User user){
		dataMap.put(user.getLogin(), user);
	}
	
	public static String returnUser(String login){
		User userFound = null;
		if (dataMap!=null && dataMap.get(login)!=null){
			userFound= dataMap.get(login);
		}
		
		if (dataMap.get(login).getLogin()== "default"){
			userFound=def;
		}
		
		Gson gson = new Gson();
		String json=gson.toJson(userFound);
		return json;
	}

}
