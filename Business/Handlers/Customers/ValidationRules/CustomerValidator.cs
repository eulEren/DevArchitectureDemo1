
using Business.Handlers.Customers.Commands;
using FluentValidation;

namespace Business.Handlers.Customers.ValidationRules
{

    public class CreateCustomerValidator : AbstractValidator<CreateCustomerCommand>
    {
        public CreateCustomerValidator()
        {
            RuleFor(x => x.CreatedUserId).NotEmpty();
            RuleFor(x => x.CreatedDate).NotEmpty();
            RuleFor(x => x.LastUpdatedUserId).NotEmpty();
            RuleFor(x => x.LastUpdatedDate).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.IsDeleted).NotEmpty();
            RuleFor(x => x.CustomerName).NotEmpty();
            RuleFor(x => x.CustomerCode).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();

        }
    }
    public class UpdateCustomerValidator : AbstractValidator<UpdateCustomerCommand>
    {
        public UpdateCustomerValidator()
        {
            RuleFor(x => x.CreatedUserId).NotEmpty();
            RuleFor(x => x.CreatedDate).NotEmpty();
            RuleFor(x => x.LastUpdatedUserId).NotEmpty();
            RuleFor(x => x.LastUpdatedDate).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.IsDeleted).NotEmpty();
            RuleFor(x => x.CustomerName).NotEmpty();
            RuleFor(x => x.CustomerCode).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();

        }
    }
}