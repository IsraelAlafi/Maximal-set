package com.orenpeer.datastructure.simulator;

import java.util.Set;

import org.junit.Test;

import com.orenpeer.datastructure.MaximalSet;

/**
 * @author Oren Peer
 * Mar 8, 2016
 */
public class Tests {

	@Test
	public void test(){
		MaximalSet<String> setCollection = new MaximalSet<String>();
		setCollection.add("a");
		setCollection.add("b");
		setCollection.getValue("a");
		Set<String> x =setCollection.getMaxValues();
		setCollection.add("a");
		setCollection.add("a");
		setCollection.remove("a");
		setCollection.remove("b");
		x = setCollection.getMaxValues();
		setCollection.add("c");
		setCollection.add("c");
		setCollection.add("c");
		setCollection.add("c");
		setCollection.add("c");
		setCollection.add("c");
		setCollection.add("c");
		setCollection.add("a");
		setCollection.add("a");
		setCollection.add("a");
		setCollection.add("a");
		setCollection.add("d");
		setCollection.add("d");
		setCollection.add("d");
		setCollection.add("b");
		x = setCollection.getMaxValues();
		setCollection.remove("e");
		
		
	}
	
	@Test
	public void simulatorTest() throws InterruptedException {
		String pool[] = {"a","b","c","d"};
		Simulator<String> simulator = new Simulator<String>(pool);
		simulator.start();
		
		Thread.sleep(2000);
		simulator.stop();

	}

}
