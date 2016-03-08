package com.orenpeer.datastructure.simulator;

import java.util.Random;

import com.orenpeer.datastructure.IMaximalSet;

/**
 * @author Oren Peer
 * Mar 8, 2016
 */
public class SimulatorWorker<T> implements Runnable {

	private IMaximalSet<T> setCollection;
	private T[] itemPool;
	private Random random = new Random();
	
	private boolean run;
	
	public SimulatorWorker(IMaximalSet<T> dataStructure, T[] items){
		this.setCollection = dataStructure;
		this.itemPool = items;
		this.run = true;
	}
	
	
	@Override
	public void run() {
		
		while(run){
			T item = getRandomItemFromPool();
			this.setCollection.add(item);
			
		}
		
		
		
	}
	
	protected T getRandomItemFromPool(){
		int randomIndex = random.nextInt(itemPool.length);
		return itemPool[randomIndex];
	}


	public boolean isRun() {
		return run;
	}


	public void setRun(boolean run) {
		this.run = run;
	}

}
