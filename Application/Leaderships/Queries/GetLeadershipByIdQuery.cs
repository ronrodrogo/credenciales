using Application.Collaborators.Queries.DTOs;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;


namespace Application.Leaderships.Queries;

public class GetLeadershipByIdQuery : IRequest<Response<Leadership>>
{
    public int Id { get; set; }
}

public class GetLeadershipByIdQueryHandler
    (
        IRepository<Leadership> _repository,
        IMapper _mapper
    ) 
    : IRequestHandler<GetLeadershipByIdQuery, Response<Leadership>>
{

    public async Task<Response<Leadership>> Handle(GetLeadershipByIdQuery request, CancellationToken cancellationToken)
    {
        Response<Leadership> result = new();

        try
        {
            var data = _repository.GetAll()
                        .Where(x => x.Id == request.Id)
                        .FirstOrDefault();

            result.Result = data;
        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }

        return result;
    }

}
