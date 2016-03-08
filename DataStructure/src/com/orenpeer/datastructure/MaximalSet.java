package com.orenpeer.datastructure;

import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.PriorityQueue;
import java.util.Set;

/**
 * @author Oren Peer
 * Mar 8, 2016
 */
public class MaximalSet<T> implements IMaximalSet<T> {

	private HashMap<T,Long> itemsCounter;
	private HashMap<Long,Set<T>> sets;
	private PriorityQueue<Long> queue;
	
	public MaximalSet(){
		this.itemsCounter = new HashMap<T,Long>();
		this.sets = new HashMap<Long,Set<T>>();
		this.queue = new PriorityQueue<Long>(2,new Comparator<Long>() {
		    public int compare(Long n1, Long n2) {
		        return -n1.compareTo(n2);
		    }
		});
	}
	
	
	@Override
	//add item O(log m) where m is number of different counters m<= n - number of different items
	public void add(T item) {
		//update items counter
		Long counter = this.itemsCounter.get(item);
		if(counter == null){
			counter = new Long(0);
		}
		
		
		//remove item from the set
		if(counter != 0){
			Set<T> set = this.sets.get(counter);
			set.remove(item);
			if(set.isEmpty()){
				this.queue.remove(counter);
				this.sets.remove(counter);
			}
		}
		
		//increment counter
		counter++;
		this.itemsCounter.put(item, counter);
		
		//insert item to new set
		Set<T> set = this.sets.get(counter);
		if(set == null){
			set = new HashSet<T>();
			this.sets.put(counter, set);
			this.queue.add(counter);
		}
		
		set.add(item);

		

	}

	@Override
	//remove item O(log m) where m is number of different counters m<= n - number of different items 
	public void remove(T item) {
		Long counter = this.itemsCounter.get(item);
		if(counter != null){
			
			//remove item from lasitemsCountert set
			Set<T> set = sets.get(counter);
			set.remove(item);

			if(set.isEmpty()){
				sets.remove(counter);
				queue.remove(counter);
			}
			//decrement item counter
			counter--;
			this.itemsCounter.put(item, counter);
			
			//remove item if counter = 0
			if(counter == 0){
				this.itemsCounter.remove(item);
			} else {
				//else insert into set
				set = sets.get(counter);
				if(set == null){
					set = new HashSet<T>();
					sets.put(counter, set);
				}
				this.queue.add(counter);
				set.add(item);
			}
		}
		
	}

	@Override
	//get value O(1)
	public long getValue(T item) {
		Long value = this.itemsCounter.get(item);
		if(value != null){
			return value.longValue();
		}
		return 0;
	}

	@Override
	//get Max value O(1)
	public Set<T> getMaxValues() {
		Long setCounter = this.queue.peek();
		if(setCounter != null){
			return this.sets.get(setCounter);
		}
		return null;
	}
	

	
	
	
}
