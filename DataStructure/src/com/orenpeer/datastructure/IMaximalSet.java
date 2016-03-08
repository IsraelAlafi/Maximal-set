package com.orenpeer.datastructure;

import java.util.Set;

/**
 * @author Oren Peer
 * Mar 8, 2016
 */
public interface IMaximalSet<T> {
	
	void add(T item);
	void remove(T item);
	long getValue(T item);
	Set<T> getMaxValues();

}
