using Application.Attachments.Commands;
using Application.Collaborators.Queries;
using Application.Common.Interfaces;
using Application.Notifications;
using DevExtreme.AspNet.Data.ResponseModel;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Leaderships.Commands.Updates;

public record UpdateLeadershipCommand : IRequest<Response<int>>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool Active { get; set; }
}

public class CreateCollaboratorCommandHandler
    (
        IRepository<Leadership> _repository,
        IMediator _mediator,
        IEmailNotificationService _emailNotification
    )
    : IRequestHandler<UpdateLeadershipCommand, Response<int>>
{
    public async Task<Response<int>> Handle(UpdateLeadershipCommand request, CancellationToken cancellationToken)
    {
        Response<int> result = new();
        try
        {
            var data = _repository.GetAll().First(x => x.Id == request.Id);

            data.Name = request.Name;
            data.Active = request.Active;

            _repository.Update(data);
            _repository.Save();

            result.Result = data.Id;

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

}

