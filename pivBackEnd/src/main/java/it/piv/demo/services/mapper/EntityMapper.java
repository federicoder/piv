package it.piv.demo.services.mapper;


import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;
public interface EntityMapper <D, E> extends Serializable {
     E toEntity(D dto);
     D toDto(E entity);
     List<E> toEntity(List<D> dtoList);
     List <D> toDto(List<E> entityList);
}

