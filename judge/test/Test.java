/*
	Description: Test Java program to see if judge works
	Problem: Read in integers from data.in and output them to data.out
*/

import java.util.*;
import java.io.*;

public class Test {
	
	public static void main (String [] args) throws Exception {
		BufferedReader in = new BufferedReader (new FileReader ("data.in"));
		PrintWriter out = new PrintWriter (new FileWriter ("data.out"));

		String temp = in.readLine();
		while (temp != null) {
			out.println(temp);
			temp = in.readLine();
		}
		
		in.close();
		out.close();
	}
}