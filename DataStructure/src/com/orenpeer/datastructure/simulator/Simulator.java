package com.orenpeer.datastructure.simulator;

import java.util.Set;

import com.orenpeer.datastructure.IMaximalSet;
import com.orenpeer.datastructure.MaximalSet;

/**
 * @author Oren Peer
 * Mar 8, 2016
 */
public class Simulator<T> {

	private IMaximalSet<T> setCollection = new MaximalSet<T>();

	SimulatorWorker<T> simulator;
	Thread workerThread;
	T[] itemPool;
	
	public Simulator(T[] items){
		itemPool= items;
		simulator = new  SimulatorWorker<T>(setCollection,itemPool);
	}
	
	public void start(){
		if(workerThread == null || !workerThread.isAlive()){
			workerThread = new Thread(simulator, "Simulator Woreker Thread");
			workerThread.start();
		}
	}
	
	public Set<T> stop(){
		simulator.setRun(false);
		try {
			workerThread.join();
			return setCollection.getMaxValues();
		} catch (InterruptedException e) {
			return null;
		}
		
	}
	
	
}
